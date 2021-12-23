function ReadOnlyRow({ data }){
    return(
        <>
            <tr>
                <td>{data.category}</td>
                <td>${data.expense}</td>
            </tr> 
        </>
    )
}

export default ReadOnlyRow;