interface Props {
  textButton: string
  variant?: 'primary' | 'outlined' | 'text'
  functionButton?: () => void
}

export default function Button({ textButton, variant = 'primary', functionButton }: Props) {
  const baseClasses = 'px-6 py-2 rounded font-bold transition-colors duration-300'

  let variantClasses = ''

  if (variant === 'primary') {
    variantClasses = 'bg-[#fa5203] hover:bg-[#e04802] text-white'
  } else if (variant === 'outlined') {
    variantClasses = 'border border-[#fa5203] text-[#fa5203] hover:bg-[#fa5203] hover:text-white'
  } else if (variant === 'text') {
    variantClasses = 'text-[#fa5203] hover:bg-primary-100'
  }

  return (
    <button onClick={functionButton} className={`${baseClasses} ${variantClasses}`}>
      {textButton}
    </button>
  )
}
