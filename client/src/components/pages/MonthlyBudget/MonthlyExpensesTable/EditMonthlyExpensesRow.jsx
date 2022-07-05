import CurrencyInput from 'react-currency-input-field';

function EditMonthlyExpensesRow({ budget, editFormData, handleEditFormChange, handleEditFormExpense, handleEditCancelClick, minDate, maxDate }){
    return(
        <>
            <tr>
                <td>
                    <input className='form-control' type="date" name="date" value={editFormData.date} 
                        min={minDate} 
                        max={maxDate} 
                        onChange={handleEditFormChange} 
                        required 
                    />
                </td>

                <td>
                    <select className='form-select' name="category" value={editFormData.category} onChange={handleEditFormChange}>
                        <option value={-1} disabled>
                            Category
                        </option>
                        {budget.map((budget_) => (
                            <option key={budget_.id} value={budget_.id}>
                                {budget_.category} - {budget_.type}
                            </option>
                        ))}
                    </select>
                </td>
        
                <td>
                    <CurrencyInput 
                        placeholder='$100 spent'
                        value={editFormData.expense} 
                        step={.01} fixedDecimalLength={2} prefix={'$'} 
                        onValueChange={handleEditFormExpense}
                        required
                        style={{ width: '100%' }}
                    />
                </td>
                
                <td>
                    <input type='text' name="comment" placeholder="Comments" 
                        value={editFormData.comment} onChange={handleEditFormChange}
                        style={{ width: '100%' }} 
                    />
                </td>

                <td className="text-center">
                    <button type='submit' className='btn btn-secondary btn-sm me-1'>
                        Save
                    </button>
                    <button type='button' className='btn btn-secondary btn-sm ml-1' onClick={handleEditCancelClick}>
                        Cancel
                    </button>
                </td>
            </tr> 
        </>
    )
}

export default EditMonthlyExpensesRow;