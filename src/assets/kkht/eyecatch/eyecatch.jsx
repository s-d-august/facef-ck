import React, { useEffect, useRef } from "react"
import "./eyecatch.css"
import gsap from "gsap";
import { ScrambleTextPlugin, SplitText, CustomEase, CustomBounce } from "gsap/all";


gsap.registerPlugin(ScrambleTextPlugin, SplitText, CustomBounce, CustomEase)

const Eyecatch = ({ mode }) => {
    const kikaiRef = useRef();
    const hentaiRef = useRef();
    const logoRef = useRef();

    useEffect(() => {
        if (!kikaiRef.current) return;

        if (mode === "linear") {
            kikaiRef.current.classList.add("linear")
            hentaiRef.current.classList.add("linear")
            logoRef.current.classList.add("linear")
        } else {
            kikaiRef.current.classList.remove("linear")
            hentaiRef.current.classList.remove("linear")
            logoRef.current.classList.remove("linear")
        }

        document.fonts.ready.then(() => {

            function kikaiAnimation() {
                return (
                    gsap.to(kikaiRef.current, {
                        duration: mode === "linear" ? 1.75 : 3.5,
                        scrambleText: "KIKAI"
                    })
                )
            }

            function hentaiAnimation() {
                let tl;
                SplitText.create("#hentai", {
                    type: "chars",
                    onSplit(self) {
                        tl = gsap.timeline().fromTo(self.chars, { scale: 0, rotation: "random([-30, 30])" }, {
                            duration: mode === "linear" ? 1.5 : 3,
                            scale: 1,
                            stagger: 0.2,
                            rotation: 0,
                            ease: "hentaiBounce"
                        });
                    }
                });
                return tl;
            }

            CustomBounce.create("hentaiBounce", {
                strength: 0.7,
                squash: 0,
                squashID: "myBounce-squash",
            });

            if (mode == "linear") {
                console.log("linear noted")
                const tl = gsap.timeline()
                tl.add(kikaiAnimation())
                tl.add(hentaiAnimation(), "-=1")
            } else {
                kikaiAnimation()
                hentaiAnimation()
            }

        })
    }, [])

    return (
        <div id="kkhtLogoDiv" ref={logoRef}>
            <div id="kikai" ref={kikaiRef}></div>
            <div id="hentai" ref={hentaiRef}>HENTAI</div>
        </div>
    );
}

export default Eyecatch