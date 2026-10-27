export const getContact = async()=>{
    const res = await fetch("http://localhost:4000/contacts")
    const data =await res.json()
    return data
}

export const contactPersonById = async(id)=>{
    const res= await fetch(`http://localhost:4000/contacts/${id}`)
    const data = await res.json()
    return data;
}