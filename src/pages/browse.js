import React from "react";
import { useContent } from "../hooks";
import selectionFilter from "../utils/selection-filter";
import {BrowseContainer} from '../containers/browse';

export default function Browse() {
    const {series} = useContent('series');
    const {films} = useContent('films');
    const {HindiMovies} = useContent('HindiMovies');
    const slides = selectionFilter({series,films,HindiMovies});

    return <BrowseContainer slides={slides}/>;
}