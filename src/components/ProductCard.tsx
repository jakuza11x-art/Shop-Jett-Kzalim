export default function ProductCard({

title,

price

}:any){

return(

<div className="card">

<h3>

{title}

</h3>

<p>

{price}đ

</p>

<button className="btn">

Mua ngay

</button>

</div>

)

}
