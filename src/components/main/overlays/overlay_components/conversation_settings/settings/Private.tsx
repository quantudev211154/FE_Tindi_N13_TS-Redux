type Props = {
  returnToMainSetting: Function
}

const Private = ({ returnToMainSetting }: Props) => {
  return (
    <div
      onClick={() => {
        returnToMainSetting()
      }}
    >
      Private
    </div>
  )
}

export default Private
