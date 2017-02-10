let initialState = {
    'id1' : {
        entryId: 'id1',
        name: 'Kittens somewhere watching',
        poster: 'poster1.jpg',
        src: 'gatos.mp4'
    },
    'id2' : {
        entryId: 'id2',
        name: 'Beautiful cat eyes',
        poster: 'poster2.jpeg',
        src: 'Cat_Eyes_Close.mp4'
    },
    'id3': {
        entryId: 'id3',
        name: 'Cat in the sun',
        poster: 'poster3.jpeg',
        src: 'cat_in_the_sun.mp4'
    }
}

export default function ( state = initialState, action ) {
    switch ( action.type ) {
        default: {
            return state;
        }
    }
}