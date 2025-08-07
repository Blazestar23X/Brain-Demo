import React, {useEffect, useState } from "react";
//import matter from "gray-matter";
import frontMatter from "front-matter";
import { marked } from "marked";

export default function Blog() {
    const [posts,setPosts] = useState([]);

    useEffect (() => {
        /*
        function importAll(r) {
            return r.keys().map((fileName) => {
                const file = r(fileName); //load file
                const content = matter (file.default);
                return {
                    title: content.data.title,
                    date: content.data.date,
                    body: marked (content.content)
                };
            });
        }*/
        async function loadPosts() {
            const importAll = (r) => r.keys().map(r);
            const files = importAll(require.context("./posts", false, /\.md$/));

            const posts = await Promise.all(
                files.map(async (file) => {
                    const response = await fetch(file);
                    const raw = await response.text();
                    const { attributes, body } = frontMatter(raw);

                    return {
                        title: attributes.tile,
                        date: attributes.date,
                        body: marked(body),
                    };
                })
            );
            setPosts(posts);
        }
        loadPosts();
        /*
        const posts = importAll(require.context("./posts", false, /\.md$/));//match end of string
        setPosts(posts);*/
    },[]);

    return (
        <div>
            <h1>Blog</h1>
            {posts.map((post,i)=> (
                <div key={i}>
                    <h2>{post.title}</h2>
                    <small>{post.date}</small>
                    <div dangerouslySetInnerHTML={{ __html: post.body }} /> {/* inserts string as raw html*/}
                </div>
            ))}
        </div>
    );
}