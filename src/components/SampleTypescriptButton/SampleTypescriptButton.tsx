import { MouseEventHandler } from 'react'

type Props = {
  onClick: MouseEventHandler,
  text: string,
  className: string,
}

const SampleTypescriptButton = ({ onClick, text, className}: Props) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
)

export default SampleTypescriptButton
