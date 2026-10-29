export const getContact = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/contacts`)
    const data =await res.json()
    return data
}

export const contactPersonById = async(id)=>{
    const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/contacts/${id}`)
    const data = await res.json()
    return data;
}