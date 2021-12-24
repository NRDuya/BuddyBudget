function EditableRow({ editFormData, handleEditFormChange, handleEditCancelClick }){
    return(
        <>
            <tr>
                <td>
                    <input type='text' name="category" placeholder="Enter a category" value={editFormData.category} onChange={handleEditFormChange} required/>
                </td>
                <td>
                    <input type='number' name="expense" placeholder="Enter a BudGet" step='.01' value={editFormData.expense} onChange={handleEditFormChange} required/>
                </td>
                <td>
                    <button type='submit'>Save</button>
                    <button type='button' onClick={handleEditCancelClick}>Cancel</button>
                </td>
            </tr> 
        </>
    )
}

export default EditableRow;