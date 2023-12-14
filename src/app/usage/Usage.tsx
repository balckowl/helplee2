"use-client"
import React from 'react'

const Usage = () => {

    return (
        <>
            <section>
                <div className="container">
                    <div className="row d-flex justify-content-center g-0">
                        <div className="col-lg-11">
                            <h2 className='text-white page-title'>Usage</h2>
                            <div className="row d-flex justify-content-center g-0 bg-white py-5 page-base">
                                <div className="col-lg-10 col-11">
                                    <article className='article'>
                                        <h3>Helpleeとは?</h3>
                                        <p>CSSをGUIで直感的に生成することのできるWeb制作お助けツールです。</p>
                                        <p>LOGINをすることによって、生成した各CSSはお気に入り保存することも可能です。</p>
                                        <h3>使い方</h3>
                                        <p>各CSSジェネレータは同じような構造をしているため、LinerGradientについて説明をします。</p>
                                        <img src="/image/article-linearGradient.png" alt="" />
                                        <ul>
                                            <li>まず、グラデーションの角度を設定します。</li>
                                            <li>次に各カラーフィールドの色と終始位置を調整し、グラデーションを作ります。</li>
                                            <li>もし、フィールドの追加や削除を行いたい場合は、角度調整の下のプラス、マイナスボタンで行うことが可能です。</li>
                                            <li>完成したCSSをコピーしたい場合は、コードブロックの左上にあるボタンの左をクリックしてください。</li>
                                            <li>LOGIN状態であれば、左上の右の<span className='marker'>星マークをクリックすることで、お気に入り保存が可能</span>です。</li>
                                        </ul>
                                        <h3>ログインについて</h3>
                                        <p>現在、LOGINは<span className='marker'>Googleまたは、GitHub</span>で行うことが可能となっています。</p>
                                        <img src="/image/article-login.png" alt="" />
                                        <h3>My Pageについて</h3>
                                        <p>LOGINしている状態であれば、以下のような画面を見ることができます。</p>
                                        <p>各CSSジェネレータでお気に入り登録したCSSを確認することができます。</p>
                                        <img src="/image/article-mypage.png" alt="" />
                                        <p><span className='marker'>目のマークを押すことでプレビュー</span>を、ゴミ箱を押すことで削除を行うことができます。</p>
                                        <p>また、Mypageでも各ジェネレータページ同様にコピーを行うことができます。</p>
                                        <h3>QRcode</h3>
                                        <p>QRcodeはCSSジェネレータではないですが、Web制作のお助けをするものです。</p>
                                        <img src="/image/article-qrcode.png" alt="" />
                                        <p>URLのフィールドにQRcode化したいサイトのURLを入れると、QRcodeを生成してくれます。</p>
                                        <p>色を決めることもでき、ダウンロードも可能となっています。</p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Usage