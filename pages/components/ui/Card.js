import React from 'react'

const CardUI = ({ prop, listProp, isNew }) => {
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure className="overflow-hidden h-64">
                <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body mt-2">
                <div className='card-title'>
                    <h2 className="text-lg font-semibold">{prop.name}</h2>
                    {isNew && <div className="badge badge-secondary">NEW</div>}
                </div>

                <p className="text-gray-500">{prop.description}</p>
                <div className="mt-4 flex card-actions justify-between items-center">
                    <span className="text-primary-500 font-bold text-lg">
                        {prop.totalPriceEther} ETH
                    </span>
                    {prop.isListed ? 
                        <button
                        className="btn btn-primary btn-disabled"
                    >
                        Listed
                    </button>
                     : 
                        <button
                        className="btn btn-primary"
                        onClick={() => listProp(prop)}
                    >
                        List Now
                    </button>
                    
                    }
                    
                </div>
                <div className="mt-2">
                    {/* <p className="text-sm text-gray-600">Seller Address: {prop.seller}</p> */}
                    {/* <p className="text-sm text-gray-600">Buyer Address: {prop.buyer}</p> */}
                </div>
            </div>
        </div>
    );
};

export default CardUI;
