import Navbar from "@/components/Navbar"

import Hero from "@/components/Hero"

import Footer from "@/components/Footer"

import ProductCard from "@/components/ProductCard"

export default function Home(){

return(

<>

<Navbar/>

<Hero/>

<div className="container">

<h2>

File nổi bật

</h2>

<br/>

<ProductCard

title="Discord Bot V11"

price={50000}

/>

<br/>

<ProductCard

title="Selfbot Prime"

price={100000}

/>

</div>

<Footer/>

</>

)

}
