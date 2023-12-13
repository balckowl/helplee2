import { Metadata } from "next"
import Card from "./components/Card/Card"

export const metadata: Metadata = {
  title: 'Helplee',
  description: 'GUIで直感的にCSSを生成することができるジェネレーターサイトです。',
  openGraph: {
    title: 'Helplee',
    description: 'GUIで直感的にCSSを生成することができるジェネレーターサイトです',
    url: "helplee2.vercel.app",
    siteName: 'Helplee',
    images: [
      {
        width: '1200',
        height: '675',
        url: 'https://helplee2.vercel.app/image/ogp-helplee.png'
      }
    ],
    locale: 'jp',
    type: 'website',
  }
}

const Home = () => {

  return (
    <>
      <section>
        <div className="container">
          <div className="row g-4">
            <Card name={'Linear-Gradient'} link={'/liner-gradient'} imgUrl={'/image/Liner-Gradient-icon.png'}/>
            <Card name={'Box-Shadow'} link={'/box-shadow'} imgUrl={'/image/Box-Shadow-icon.png'} />
            <Card name={'Image-Filter'} link={'/img-filter'} imgUrl={'/image/Img-Filter-icon.png'} />
            <Card name={'Text-Shadow'} link={'/text-shadow'} imgUrl={'/image/Text-Shadow-icon.png'} />
            <Card name={'QR-Code'} link={'/qr-code'} imgUrl={'/image/QRCode-icon.png'} />
           </div>
        </div>
      </section>
    </>
  )
}

export default Home