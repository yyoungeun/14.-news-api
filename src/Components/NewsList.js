import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NewsItem from './NewsItem';
import usePromise from '../lib/usePromise';


const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    `;

    const NewsList = ({category}) => {
        const [loading, response, error] = usePromise(() => {
            const query = category === 'all' ? '': `&category=${category}`;
            return axios.get(
                `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=38084129894d4badadf691083aa0d698`,
                );
        }, [category]);

        // useEffect(() => {
        //     //async를 사용하는 함수 따로 선언
        //     const fetchData = async () => {
        //         setLoading(true);
        //         try{
        //             const query = category === 'all' ? '': `&category=${category}`;
        //             const response = await axios.get(
        //                 `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=38084129894d4badadf691083aa0d698`,
        //             );
        //             setArticles(response.data.articles);
        //         } catch(e) {
        //             console.log(e);
        //         }
        //         setLoading(false);
        //     };
        //     fetchData();
        // }, [category]);

        //대기 중일 때
        if(loading){
            return <NewsListBlock>대기중...</NewsListBlock>
        }
        //아직 response값이 설정되지 않았을 때
        if(!response){
            return null;
        }

        //에러가 발생했을 때
        if(error) {
            return <NewsListBlock>에러발생</NewsListBlock>
        }

        //response값이 유효할 때
        const {articles} = response.data;
        return (
            <NewsListBlock>
                {articles.map(article => (
                    <NewsItem key={article.url} article={article} />
                ))}
            </NewsListBlock>
        );
    };

    export default NewsList;