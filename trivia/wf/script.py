import json
import pathlib
import requests
import subprocess

h = "https://www.wholefoodsmarket.com"

ps = [
    "produce",
    "dairy-eggs",
    "meat",
    "prepared-foods",
    "pantry-essentials",
    "breads-rolls-bakery",
    "desserts",
    "frozen-foods",
    "snacks-chips-salsas-dips",
    "seafood",
    "beverages",
    "pet",
]

for p in ps:
    d = []
    r = requests.get(h + f"/api/products/category/{p}?store=10162").json()
    v = r["meta"]["total"]["value"]
    for s in range(0, v, 60):
        r2 = requests.get(h + f"/api/products/category/{p}?store=10162&limit=60&offset={s}")
        #print(len(r2.json()["results"]))
        for i in r2.json()["results"]:
            #print(i)
            for ra in ["saleStartDate", "saleEndDate", "slug", "store", "isLocal"]:
                if ra in i:
                    del i[ra]
            if i["name"] == "Skipjack Tuna in Water No Salt Added 6pk, 5 oz":
                i["imageThumbnail"] = "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/66c3dff7c1e269f176ba67d5_2024-08-20_00-15-09_other.main._FMwebp__SR300,300_.jpg"
            elif i["name"] == "Hot Honey Chili Crunch       , 7.7 fl oz":
                i["imageThumbnail"] = "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/669f133830fffa6fe6945e0b_2024-07-23_02-19-39_other.main._FMwebp__SR300,300_.jpg"
            elif i["name"] == "Dark Chocolate Chunk Superfood Oatmeal 6 Count, 1 each":
                i["imageThumbnail"] = "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/659ee34080eb2543b853de5e_2024-01-10_18-34-42_front-left.main._FMwebp__SR300,300_.jpg"
            #elif i["name"] in ["Organic Refined Sunflower Oil (32 Oz)", "High Oleic Safflower Oil, 32 fl oz", "Organic Red Wine Vinegar, 12.7 fl oz", "Hickory Smoked Extra Virgin Olive Oil, 8.5 fl oz"]:
            #    # missing??
            #    continue
            elif "imageThumbnail" not in i:
                print("warning: skipping", i)
                continue
                #assert False, i
            elif i["imageThumbnail"].endswith(".jpg"):
                i["image"] = i["imageThumbnail"][:-4] + "._FMwebp__SR300,300_.jpg"
            elif i["imageThumbnail"].endswith(".jpeg"):
                i["image"] = i["imageThumbnail"][:-5] + "._FMwebp__SR300,300_.jpeg"
            elif i["imageThumbnail"].endswith(".JPG"):
                i["image"] = i["imageThumbnail"][:-4] + "._FMwebp__SR300,300_.JPG"
            else:
                print("warning: skipping", i)
                continue
                #assert False, i
            del i["imageThumbnail"]
            d.append(i)
    with open(f"data/{p}.json", "w") as f:
        json.dump(d, f)
    #break


import sys
sys.exit(0)


# initial query to get count
v0 = {
    "storeCode": "539",
    "availability": "1",
    "published": "1",
    "categoryId": 8,
    "currentPage": 1,
    "pageSize": 10
}
q0 = """
query SearchProducts($categoryId: String, $currentPage: Int, $pageSize: Int, $storeCode: String = "539", $availability: String = "1", $published: String = "1") {
  products(
    filter: {store_code: {eq: $storeCode}, published: {eq: $published}, availability: {match: $availability}, category_id: {eq: $categoryId}}
    currentPage: $currentPage
    pageSize: $pageSize
  ) {
    total_count
  }
}
"""

r0 = requests.post(h + "/api/graphql", json={
    "operationName": "SearchProducts",
    "variables": v0,
    "query": q0
}).json()

c = r0["data"]["products"]["total_count"]
#c = 15 # temp

v = {
    "storeCode": "539",
    "availability": "1",
    "published": "1",
    "categoryId": 8,
    "currentPage": 1,
    "pageSize": c
}

q = """
query SearchProducts($categoryId: String, $currentPage: Int, $pageSize: Int, $storeCode: String = "539", $availability: String = "1", $published: String = "1") {
  products(
    filter: {store_code: {eq: $storeCode}, published: {eq: $published}, availability: {match: $availability}, category_id: {eq: $categoryId}}
    currentPage: $currentPage
    pageSize: $pageSize
  ) {
    items {
      sku
      item_title
      primary_image_meta {
        metadata
      }
      retail_price
    }
  }
}
"""

r = requests.post(h + "/api/graphql", json={
    "operationName": "SearchProducts",
    "variables": v,
    "query": q
}).json()

d = {}

for i,x in enumerate(r["data"]["products"]["items"]):
    d[x["sku"]] = {"name": x["item_title"], "price": x["retail_price"]}
    # skip items that don't have 640px webps and do them manually
    if pathlib.Path("images/" + x["sku"] + ".webp").is_file() or x["sku"] == "004856":
        print(i, "skipping")
        continue
    print(i, x)
    m = json.loads(x["primary_image_meta"]["metadata"])
    s = [j for j in m["srcSet"] if j["src"].endswith("640.webp")]
    assert len(s) == 1
    subprocess.check_call(["curl", h + s[0]["src"], "-o", "images/" + x["sku"] + ".webp", "-s"])

with open("data.json", "w") as f:
    json.dump(d, f)

print("done")