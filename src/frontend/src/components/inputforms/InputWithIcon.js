import * as React from 'react';
import Box from '@mui/material/Box';
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";

const InputWithIcon = (props) => {
    let theGrid_lat = props.currentGrid.lat ?? 0.0;
    let theGrid_lng = props.currentGrid.lng ?? 0.0;
    let theElevation = props.elevator[0].elevation ?? 0.1;


    return (
        <Grid container spacing={0} columns={11} rows={10} sx={{margin: 0, padding: 0}}>
            <Grid item xs={2}>
                <Box sx={{'& > :not(style)': {m: 1}}}>
                    <FormControl sx={{width: 270, bgcolor: '#FFF'}}>
                        <InputLabel id="select-label">Artillery System</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Artillery System"
                            value={props.currentArt}
                            onChange={props.currentArtSelected}
                        >
                            {props.artillery.map((weapon) => {
                                return (
                                    <MenuItem key={weapon.id} name={weapon.type}
                                              value={weapon.type}>{weapon.type}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={5}>
                <p>
                <span
                    className="range">Artillery Range: {Math.trunc((props.currentArtRange) * (0.00062137))} miles &nbsp;  &nbsp; - &nbsp; &nbsp; </span>
                <span className="distance">Direct distance to target: {Math.trunc(props.distance)} miles </span></p>
            </Grid>
            <Grid item xs={2}>
                <p className="currentGrid">Lat: {theGrid_lat.toFixed(2)}  &nbsp; &nbsp; &nbsp; Lng: {theGrid_lng.toFixed(4)}  &nbsp; &nbsp; &nbsp; Elevation: {theElevation.toFixed(2)}</p>
            </Grid>
            <Grid item xs={2}>
                <Box sx={{'& > :not(style)': {m: 1}}}>
                    <FormControl sx={{width: 270, bgcolor: '#FFF'}}>
                        <InputLabel id="select-label">Infantry</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Infantry"
                            value={props.currentInfantry}
                            onChange={props.currentInfantrySelected}
                        >
                            {props.infantry.map((soldier) => {
                                return (
                                    <MenuItem key={soldier.id} name={soldier.type}
                                              value={soldier.type}>{soldier.type}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
        </Grid>
    );
}

export default InputWithIcon;

