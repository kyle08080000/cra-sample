
const Input = ({id, text, value, onChangHandler}) => {
  return (
    <>
      <label htmlFor={id} className="">{ text }</label>
      <input type="text" id={id} value={value} onChange={onChangHandler} />
    </>
  )
}

export default Input;