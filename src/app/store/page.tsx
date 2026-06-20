import {products} from "@/data/products"

import ProductCard from "@/components/ProductCard"

export default function Store(){

return(

<div className="container">

<h1>

Kho File

</h1>

<br/>

{

products.map((item)=>(

<ProductCard

key={item.id}

title={item.title}

price={item.price}

/>

))

}

</div>

)

}
