function ReadOnlyRow({ data, handleEditClick, handleDeleteClick }){
    return(
        <>
            <tr>
                <td>{data.category}</td>
                <td>${data.expense}</td>
                <td>
                    <button type="button" onClick={(event) => handleEditClick(event, data)}>Edit</button>
                    <button type="button" onClick={() => handleDeleteClick(data.id)}>Delete</button>
                </td>
            </tr> 
        </>
    )
}

export default ReadOnlyRow;