import {motion} from 'framer-motion';
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledMotionDiv = styled(motion.div)`
  
`;

const waveVariants = {
    initial: { y: -50, opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: 50, opacity: 0 }
};

const waveTransition = {
    type: "spring",
    stiffness: 150,
    damping: 35,
    duration: 1
};

const AnimatedRoute = ({ children }) => (
    <StyledMotionDiv
        initial="initial"
        animate="in"
        exit="out"
        variants={waveVariants}
        transition={waveTransition}
    >
        {children}
    </StyledMotionDiv>
);

AnimatedRoute.propTypes = {
    children: PropTypes.array
};

export default AnimatedRoute;
