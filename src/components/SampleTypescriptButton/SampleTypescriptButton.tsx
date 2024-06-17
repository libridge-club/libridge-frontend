import React, { MouseEventHandler } from 'react'

type Props = {
  onClick: MouseEventHandler,
  text: string,
}

const SampleTypescriptButton = ({ onClick, text }: Props) => (
  <button onClick={onClick} className="SampleTypescriptButton">
    {text}
  </button>
)

export default SampleTypescriptButton
