import * as React from 'react';
import Container from '@mui/material/Container';
import { Grow, Slide } from '@mui/material';
import { CssBaseline } from '@mui/material';

function Feature(){
    const [isFinished, setIsFinished] = React.useState(false);
    return (
        <React.Fragment>
            <CssBaseline />
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                {/* <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={2000}
                >
                <h1> 跟工蜂一樣重要 </h1>
                </Grow> */}
                <Slide 
                    direction="right"
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={3000}
                    addEndListener={(node, done) => {
                        node.addEventListener('transitionend', done, false);
                        setTimeout(() => {
                            setIsFinished(true);
                        }
                        , 2000);
                    }}
                    mountOnEnter
                    unmountOnExit>
                    <h1> 跟工蜂一樣重要 </h1>
                </Slide>
                <Grow
                    in={isFinished}
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={1000}
                >
                <span> 一般來說，拉羅什福科曾經告訴世人，我們唯一不會改正的缺點是軟弱。這句話語雖然很短，但令我浮想聯翩。伏契克有一句座右銘，為了爭取將來的美好而犧牲了的人，都是一尊石質的雕像。這似乎非常的有道理，對吧？為什麼先有蜂還是先有蛋對我們來說這麼重要？</span>
                </Grow>
            </Container>
        </React.Fragment>
    )
}

export default Feature