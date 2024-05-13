import { length } from "file-loader";

export default function JsObj(){
    let height = [0,2,3,4,5,3,4,1],
        base = 50

    let contentEl = document.querySelector(".content");
    let itemhtml= ''
    height.forEach((item,index)=>{
        itemhtml+=`<div class="item ${index}" style="height:${item*base}px"></div>`
    })
    contentEl.innerHTML = itemhtml;
    // let itemEl = document.querySelectorAll(".item");
    contentEl.style.width = height.length*100+ "px"
    // itemEl.forEach((item,index)=>{
    //     item.style.height = height[index]* 50 + "px";
    // })

    
}

