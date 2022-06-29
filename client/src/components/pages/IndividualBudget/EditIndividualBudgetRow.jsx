import CurrencyInput from 'react-currency-input-field';

function EditIndividualBudgetRow({ editFormData, handleEditFormExpense, handleEditFormCat, handleEditCancelClick }){
    return(
        <>
            <tr>
                <td>
                    <input type='text' name="category" placeholder="Enter a category" value={editFormData.category} onChange={handleEditFormCat} required/>
                </td>
                
                <td>
                    <CurrencyInput 
                        placeholder='$100 Budgeted' 
                        value={editFormData.expense} 
                        step={.01} fixedDecimalLength={2} prefix={'$'} 
                        onValueChange={handleEditFormExpense}
                        required
                    />
                </td>

                <td className="text-center">
                    <button type='submit' className='btn btn-secondary me-2'>
                        Save
                    </button>
                    <button type='button' className='btn btn-secondary ml-2' onClick={handleEditCancelClick}>
                        Cancel
                    </button>
                </td>
            </tr> 
        </>
    )
}

export default EditIndividualBudgetRow;