import {motion} from 'framer-motion';
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledMotionDiv = styled(motion.div)`
  
`;

const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};

const RedirectAnimation = ({ children }) => (
    <StyledMotionDiv
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
    >
        {children}
    </StyledMotionDiv>
);

RedirectAnimation.propTypes = {
  children: PropTypes.object.isRequired
};

export default RedirectAnimation;
