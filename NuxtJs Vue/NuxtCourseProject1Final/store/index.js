import Vuex from 'vuex';
import Cookie from 'js-cookie';


const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            },
            addPost(state, post) {
                state.loadedPosts.push(post);
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(el => el.id === editedPost.id);
                state.loadedPosts[postIndex] = editedPost;
            },
            setToken(state, token) {
                state.token = token;
            },
            clearToken(state) {
                state.token = null;
            },
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios.$get('/posts.json')
                .then(data => {
                    const postsArray = [];

                    for (const key in data) {
                        postsArray.push({...data[key], id: key});
                    }
                    vuexContext.commit('setPosts', postsArray);
                })
            },
            setPosts(context) {
                context.commit('setPosts', posts);
            },
            addPost(vuexContext, post) {
                const createdPost = {
                    ...post,
                    updatedDate: new Date()
                }
                return this.$axios.$post(`https://nuxtproject-5917e-default-rtdb.firebaseio.com/posts.json?auth=${vuexContext.state.token}`, createdPost)
                .then(data => {
                    vuexContext.commit('addPost', {...createdPost, id: data.name});
                    // this.$axios.$put('https://nuxtproject-5917e-default-rtdb.firebaseio.com/posts/' + response.data.name + '.json',
                    // {...createdPost, id: response.data.name})
                    // this.$router.push('/admin');
                })
                .catch(e => console.log(e))
            },
            editPost(vuexContext, editedPost) {
                // const newEditPost = delete editedPost.id;
                return this.$axios.$put(`https://nuxtproject-5917e-default-rtdb.firebaseio.com/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
                editedPost)
                .then(data => {
                    vuexContext.commit('editPost', editedPost);
                })
                .catch(e => console.log(e))
            },
            authenticateUser(vuexContext, authData) {
                if (!authData.email || !authData.password) return;
                    let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

                    if (!authData.isLogin) {
                        authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='; 
                    }

                    return this.$axios.$post(authUrl + process.env.fbAPIKey,
                        {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true,
                        })
                        .then(data => {
                            vuexContext.commit('setToken', data.idToken);
                            localStorage.setItem('token', data.idToken);
                            localStorage.setItem('tokenExpiration', new Date().getTime() + +data.expiresIn * 1000);
                            Cookie.set('jwt', data.idToken);
                            Cookie.set('expirationDate', new Date().getTime() + +data.expiresIn * 1000);
                            
                            return this.$axios.$post('http://localhost:3000/api/track-data', {
                                data: 'Authenticated'
                            })
                        })
                        .catch(e => console.log(e))
            },
            // setLogoutTimer(vuexContext, duration) {
            //     setTimeout(() => {
            //         vuexContext.commit('clearToken');
            //     }, duration);
            // },
            initAuth(vuexContext, request) {
                let token, expirationDate
                if (request) {
                    if (!request.headers.cookie) return;
                    const jwtCookie = request.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));

                    if (!jwtCookie) return;
                    token = jwtCookie.split('=')[1];
                    expirationDate = request.headers.cookie.split(';')
                    .find(c => c.trim().startsWith('expirationDate=')).split('=')[1];
                } else if (process.client) {
                    token = localStorage.getItem('token');
                    expirationDate = localStorage.getItem('tokenExpiration');
                }

                if (new Date().getTime() > +expirationDate || !token) {
                    vuexContext.dispatch('logout');
                    return;
                }
                // vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime())
                vuexContext.commit('setToken', token);
            },
            logout(vuexContext) {
                vuexContext.commit('clearToken')
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');

                if (!process.client) return;
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
            },
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts;
            },
            isAuthenticated(state) {
                return state.token;
            }
        }
    })
}

export default createStore;