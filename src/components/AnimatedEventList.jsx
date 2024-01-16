import {motion, AnimatePresence} from 'framer-motion';
import EventList from './EventList.jsx';
import PropTypes from 'prop-types';

const pageVariants = {
    initial: {opacity: 0, x: -100},
    animate: {opacity: 1, x: 0},
    exit: {opacity: 0, x: 100}
};

const AnimatedEventList = ({children}) => {
    return (
        <AnimatePresence>
            <motion.div
                key={pageKey}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{duration: 0.5}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

AnimatedEventList.propTypes = {
    events: PropTypes.array.isRequired,
    pageKey: PropTypes.number.isRequired
};

export default AnimatedEventList;
