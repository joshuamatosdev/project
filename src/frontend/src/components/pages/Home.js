import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Home = () => {
    return (
        <>
            <table width="100%">
                <tbody><tr><td colSpan="3">
                <div className="imageContainer">
                    <script src="http://localhost:3000/home_js.js" />
                    <div className="container">
                        <div className="title">&lt; JOSH FULL-STACK DEVELOPER /&gt;</div>
                        <div className="subtitle"> Software + Agile + Spring + Python + React + <font className="redText">Sith</font></div>
                    </div>
                    <img src="http://localhost:3000/splash.png" className="splash" alt="splash"/>
                </div>
            </td>
            </tr>
                <tr>
                    <td>
                        <br />
                        <br />
                        <br />
                    </td>
                </tr>
            <tr>
                <td>
                    <Card sx={{ maxWidth: 645, marginLeft:15}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="250"
                            image="/2.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tactical Map Variants
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                </td>
                <td>
                    <Card sx={{ maxWidth: 645 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image="/3.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                   Seamlessly Coordinate Across Teams
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </td>
                <td>

                    <Card sx={{ maxWidth: 645 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image="/1.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  Real Time Map Data
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </td>
            </tr>
            </tbody></table>

        </>
    );
}

export default Home;