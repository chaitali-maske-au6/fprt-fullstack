import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

function Favorite(props) {
    const user = useSelector(state => state.user);

    const productId = props.productId
    const userFrom = props.userFrom
    const productTitle = props.productInfo.title
    const productPost = props.productInfo.backdrop_path
    const productRunTime = props.productInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    const variables = {
        productId: productId,
        userFrom: userFrom,
        productTitle:productTitle,
        productPost: productPost,
        productRunTime: productRunTime
    }

    const onClickFavorite = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            //when we are already subscribed 
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('Failed to Remove From Favorite');
                    }
                });

        } else {
            // when we are not subscribed yet

            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('Failed to Add To Favorite');
                    }
                });
        }
    };

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.subscribeNumber);
                } else {
                    alert('Failed to get Favorite Number');
                }
            })
;
        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.subcribed);
                } else {
                    alert('Failed to get Favorite Information');
                }
            });

    }, []);


    return (
        <>
            <Button onClick={onClickFavorite} > {!Favorited ? "Add to Favorite" : "Not Favorite"} 
            {FavoriteNumber}
            </Button>
        </>
    )
}

export default Favorite