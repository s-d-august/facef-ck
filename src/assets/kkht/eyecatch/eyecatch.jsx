import React, { useEffect, useRef } from "react"
import "./eyecatch.css"
import gsap from "gsap";
import { ScrambleTextPlugin, SplitText, CustomEase, CustomBounce } from "gsap/all";


gsap.registerPlugin(ScrambleTextPlugin, SplitText, CustomBounce, CustomEase)

const Eyecatch = () => {
    const kikaiRef = useRef();

    useEffect(() => {
        if (!kikaiRef.current) return;
        document.fonts.ready.then(() => {
            console.log(kikaiRef.current)
            gsap.to(kikaiRef.current, {
                duration: 3.5,
                scrambleText: "KIKAI"
            });

            SplitText.create("#hentai", {
                type: "chars",
                onSplit(self) {
                    gsap.timeline().fromTo(self.chars, { scale: 0, rotation: "random([-30, 30])" }, {
                        duration: 3,
                        scale: 1,
                        stagger: 0.05,
                        rotation: 0,
                        ease: "hentaiBounce"
                    });
                }
            });

            CustomBounce.create("hentaiBounce", {
                strength: 0.7,
                squash: 0,
                squashID: "myBounce-squash",
            });

        })
    }, [])


    return (

        <div id="kkhtLogoDiv">
            <div id="kikai" ref={kikaiRef}></div>
            <span id="hentai">HENTAI</span>
        </div>
    );
}

export default Eyecatch