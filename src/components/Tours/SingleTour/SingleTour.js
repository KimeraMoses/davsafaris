import React, { useEffect, useState } from "react";
import classes from "./SingleTour.module.css";
import singleImage from "../../../assets/dave-safaris-Home-Uganda.jpg";
import { useParams } from "react-router";
import {
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
} from "@material-ui/core";
import { Form } from "react-bootstrap";
import { TagFacesOutlined } from "@material-ui/icons";
import { Button } from "../../UI/Button/Button";
import Itinary from "./Itinerary/Itinary";
import JumpNavigation from "./Navigation/JumpNavigation";
import BookingForm from "./Bookings/BookingForm";
import Reviews from "./Reviews/Reviews";
import PriceQuote from "./PriceQuote/PriceQuote";
import RelatedTours from "./RelatedTour/RelatedTours";
import { useDispatch, useSelector } from "react-redux";
import { fetchTourName } from "../../../store/Actions/TourActions";


const SingleTour = () => {
  const dispatch = useDispatch();
  const { tourTitle } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchTourName(tourTitle));
  }, [tourTitle]);
  const [show, setShow] = useState(false);
  const Tour = useSelector((state) => state.tour.tourDetails);

  return (
    <div className={classes.dav__single_tour_page_wrapper}>
      <div
        className={classes.dav__single_tour_hero}
        style={{
          backgroundImage: `url(${Tour && Tour.imageCover})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h1>{Tour && Tour.name}</h1>
      </div>
      <JumpNavigation />

      <div className={classes.dav__single_tour_highlights_wrapper}>
        <div className={classes.dav__tour_highlights} id="description">
          <div className={classes.dav__single_tour_description}>
            {Tour.description}
          </div>
          <h2>Tour highlights</h2>
          <div className={classes.dav__tour_highlights_list}>
            <ul>
              {Tour &&
                Tour.tourActivities &&
                Tour.tourActivities.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>{item}</p>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className={classes.dav__single_tour_package_wrapper}>
            <PriceQuote
              type="includes"
              Items={
                Tour && Tour.packageDetails && Tour.packageDetails.price_inludes
              }
            />
            <PriceQuote
              type="excludes"
              Items={
                Tour &&
                Tour.packageDetails &&
                Tour.packageDetails.price_excludes
              }
            />
          </div>

          <div className={classes.dav__intinary_details} id="itinerary">
            <div className={classes.dav__itinary_header}>
              <h2>Itinary in details</h2>
            </div>

            <ul className={classes.dav__intinary_list_wrapper}>
              {Tour &&
                Tour.dayActivityDescription &&
                Tour.dayActivityDescription.map((itinary, index) => {
                  return (
                    <Itinary
                      key={index}
                      day={itinary.day}
                      itinTitle={itinary.title}
                      itinDescription={itinary.description}
                      meal_plan={itinary.meal_plan}
                      accomodation={itinary.accomodation}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
        <div className={classes.dav__tour_bookings_section}>
          <BookingForm />
        </div>
      </div>
      <Reviews Tour={Tour} />
      <RelatedTours TourCategory={Tour && Tour.category} />
    </div>
  );
};

export default SingleTour;
