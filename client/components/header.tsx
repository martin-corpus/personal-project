
import imageUrl from '/images/whistle.png'

export default function Header() {
  return (
    <>
      <a href="/" id="Logo">
        <img src={imageUrl} alt="Logo" id="logo"/>
      </a>
    </>
  )
}
