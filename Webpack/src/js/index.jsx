import * as $ from 'jquery'
import React from 'react'
import {render} from 'react-dom'
import Post from '@models/Post'
// import json from '../assets/json.json'
// import xml from '../assets/data.xml'
// import csv from '../assets/data.csv'
import WebpackLogo from '../assets/webpackLogo.png'
import '../styles/style.css'

const post = new Post('Webpack Post Title', WebpackLogo);

$('pre').addClass('code').html(post.toString())

const App = () => (
    <div class="container">
        <h1>Webpack Course</h1>
        <hr />

        <img src="assets/webpackLogo.png" class="logo biglogo"/>

        <hr />

        <pre />
    </div>
)

render(<App />, document.getElementById('app'))

// console.log('JSON:', json);
// console.log('XML:', xml);
// console.log('CSV:', csv);