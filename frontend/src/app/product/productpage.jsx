import Image from 'next/image';
import React from 'react'



const images = [
  "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=1920", // GTA V
  "https://images.pexels.com/photos/3609139/pexels-photo-3609139.jpeg?auto=compress&cs=tinysrgb&w=1920", // RDR2

];
const relatedgames = [
  {
    image: "https://picsum.photos/500/500?random=1"
  },
  {
    image: "https://picsum.photos/500/500?random=2"
  },
  {
    image: "https://picsum.photos/500/500?random=3"
  },
]

const relatedname = [
  {
    id: 1,
    name: "GRAND THEFT AUTO V",
    imageInd: 0,
  },
  {
    id: 2,
    name: "GRAND THEFT AUTO ONLINE",
    imageInd: 1,
  },
  {
    id: 3,
    name: "GRAND THEFT AUTO ONLINE",
    imageInd: 3,
  },
];

const products = [
  {
    id: 1,
    name: "GRAND THEFT AUTO V",
    imageIndex: 0,
  },
  {
    id: 2,
    name: "GRAND THEFT AUTO ONLINE",
    imageIndex: 1,
  },
];
const loop = () => {
  return Array.from({ length: 6 }, () => ({
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.Placeat aliquam consectetur vero consequuntur rem dolores laboriosam eos quisquam blanditiis ad veniam eum nulla veritatis ipsum animi odit dolor incidunt autem Lorem ipsum dolor sit amet consectetur adipisicing elit.Placeat aliquam consectetur vero consequuntur rem dolores laboriosam eos quisquam blanditiis ad veniam eum nulla veritatis ipsum animi odit dolor incidunt autem ${<br />}`,
  }));
};


const Productpage = () => {
  return (
    <div className='text-white mt-30'>
      <div className='flex justify-center'>
        <div className="card-gaming rounded-lg overflow-hidden">
          <div className="relative h-150 w-200 border-2 border-gray-500">
            <Image
              src={images[products[0].imageIndex]}
              alt={products[0].name}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
          <div className='flex mt-10'>
            <div className="card-content">
              <h3 className="text-sm font-semibold">NewswireGTA | OnlineContent | Updates</h3>
              <h3 className="text-5xl font-bold">{products[0].name}</h3>
              <h1 className='mt-10 mb-10 text-sm font-bold animate-pulse'>Jan 2025</h1>
              <h3 className='w-200'>
                {loop().map((item, index) => (
                  <p key={index}>{item.description}
                  </p>
                ))}

              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-5'>
        <div className="relative h-150 w-250 border-2 border-gray-500">
          <Image
            src={images[products[1].imageIndex]}
            alt={products[1].name}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>

      </div>
      <div className='flex justify-center'>
      <hr className='mt-10 text-gray-500 w-[66%] md:w-[66%] sm:w-[50%] '/>
      </div>
      
      <div className='mt-10'>
        <span className='flex justify-center font-bold text-4xl animate-pulse'>Related Games</span>
        <div className='flex mt-5 py-10 justify-center'>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-12">
            {relatedname.map((product) => ( 
              <div
                key={product.id}
                className="card-gaming rounded-lg overflow-hidden"
              >
                <div className="relative h-80 w-full  border-2 border-gray-500">
                  <Image
                    src={relatedgames[product.imageInd]}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <div className="card-content">
                  <h3 className="text-2xl">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
      )
}

      export default Productpage;
