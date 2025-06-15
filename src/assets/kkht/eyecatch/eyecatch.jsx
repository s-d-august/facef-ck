
import React, { useEffect } from "react"
import "./eyecatch.css"
import gsap from "gsap";
import { ScrambleTextPlugin, SplitText, CustomEase, CustomBounce } from "gsap/all";


gsap.registerPlugin(ScrambleTextPlugin, SplitText, CustomBounce, CustomEase)

const Eyecatch = () => {

    useEffect(() => {
        document.fonts.ready.then(() => {
            gsap.to("#kikai", {
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
            <span id="kikai"></span>
            <span id="hentai">HENTAI</span>
        </div>
    );
}

export default Eyecatch