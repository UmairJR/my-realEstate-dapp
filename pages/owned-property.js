import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardUI from './components/ui/Card';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react'

const OwnedProperty = ({ web3, account, realEstate, escrow, escrow_address, realEstate_address }) => {
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState([]);
    const router = useRouter();
    const toast = useToast();

    const loadOwnedProperties = async () => {
        console.log('Loading....');
        try {
            const totalItems = await escrow.methods.getItemCount().call();
            console.log("Total item count: ", totalItems);
            let props = [];
            for (let i = 1; i <= totalItems; i++) {
                const prop = await escrow.methods.props(i).call();
                console.log("Prop: ", prop);
                if (!prop.sold && prop.seller.toLowerCase() === account) {
                    const uri = await realEstate.methods.tokenURI(prop.tokenId).call();
                    console.log("URI: ", uri);
                    const response = await axios.get(uri);
                    console.log("RESPONSE: ", response)
                    // console.log("RESPONSE JSON: ",response.json())
                    const metadata = response.data;
                    console.log("METADATA: ", metadata);
                    // const totalPrice = await mpContract.methods.getTotalPrice(item.itemId).call();
                    // console.log("TOTALPRICE: ", totalPrice);
                    const totalPrice = prop.price;
                    const totalPriceEther = web3.utils.fromWei(totalPrice.toString(), 'ether');
                    props.push({
                        totalPrice,
                        totalPriceEther,
                        propId: prop.propertyId,
                        seller: prop.seller,
                        buyer: prop.buyer,
                        name: metadata.name,
                        description: metadata.description,
                        image: metadata.image,
                        isListed: prop.propertyInfo.isListed
                    })
                }
            }
            setLoading(false);
            console.log("Properties: ", props);
            setProperties(props);
        }
        catch (err) {
            console.log(err);
        }

    }
    const listProp = async (prop) => {
        console.log("Listing....")
        try {
            console.log(prop.propId)
            const tx = await escrow.methods.listProperty(prop.propId).send({
                from: account
            });
            console.log(tx)

            toast({
                title: 'Property Listed',
                description: 'Your Property has been listed successfully!',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            loadOwnedProperties()
            router.push('/listed-property');
        }
        catch (error) {
            console.error("Error listing property:", error);
            toast({
                title: 'Error',
                description: 'An error occurred listing your Property.',
                status: 'error',
                duration: 5000, 
                isClosable: true,
            });
        }
        finally {
            console.log("Listed!!!");
        }
    }
    useEffect(() => {
        loadOwnedProperties();
    }, [])

    if (loading) return (
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <span className="loading loading-ring loading-md"></span>
            <p className='mx-3 my-0 font-bold text-lg text-primary'>Loading...</p>
        </main>
    )
    return (
        <div className="mt-5 mb-10">
            <h1 className="text-3xl font-bold font-serif mb-4 text-center">Owned Properties</h1>
            <div className="px-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-center">
                {properties.length > 0 ? (
                    properties.map((prop, idx) => (
                        <div key={idx}>
                            <CardUI prop={prop} listProp={listProp} isNew={idx === properties.length - 1} />
                        </div>
                    )).reverse()
                ) : (
                    <main style={{ padding: "1rem 0" }}>
                        <h1 className="text-3xl font-bold font-serif mb-4 text-center">No Properties to List</h1>
                    </main>
                )}
            </div>
        </div>
    );
}

export default OwnedProperty
