"use client"
import * as motion from 'motion/react-client';
import * as framer from 'framer-motion';
import { ButtonExel } from '@/components/ButtonExel';

// import { motion } from "motion/react"
// import { motion } from "framer-motion";




const Blog = () => {

    console.log("Motion:", framer);
    return (
        <div className='flex justify-center items-center h-screen flex-col space-y-4'
      
        >
        <motion.h1 className="font-bold text-primary"
        //   animate={{ opacity: 1 , rotate:1 }}
        // initial={{ opacity: 0}}
        // whileHover={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", rotate: 2 }}
        // transition={{ duration: 0.5 , ease: "easeInOut" }}
        
        >Blog</motion.h1>
        <p className="text-gray-600">Welcome to the blog page!</p>
        <ButtonExel

            text="Click Me"
            size="lg"
            className="mt-4"
            onClick={() => alert('Button Clicked!')}
        />
        </div>
    );
}

export default Blog;