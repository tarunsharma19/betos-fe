"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../ui/card";
import { TeamCard } from "./carousel";
import Image from "next/image";

export function MatchCardsProfile({ combinedData }: { combinedData: any }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: "60px",
    gap: 10,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "20px",
        },
      },
    ],
  };

  const teams = [
    {
      home: "Chelsea",
      away: "Arsenal",
      homeLogo: "/assets/team1.png",
      awayLogo: "/assets/team2.png",
    },
    {
      home: "Liverpool",
      away: "Big Blues",
      homeLogo: "/assets/team1.png",
      awayLogo: "/assets/team2.png",
    },
    // Add more matchups here
  ];

  console.log(combinedData);
  const a = [
    {
        "fixture_id": "1208512",
        "odds": "182",
        "outcome": 1,
        "user": "0xeccc2d38e0c721188830e96eff70fd1e5bf1319e29315c83a074c339325b16eb",
        "wager": "2000000",
        "fixtureData": {
            "fixture": {
                "periods": {
                    "first": null,
                    "second": null
                },
                "venue": {
                    "id": 1460,
                    "name": "San Mamés Barria",
                    "city": "Bilbao"
                },
                "status": {
                    "long": "Not Started",
                    "short": "NS",
                    "elapsed": null
                },
                "id": 1208512,
                "referee": "Pablo González",
                "timezone": "UTC",
                "date": "2024-08-28T17:00:00+00:00",
                "timestamp": 1724864400
            },
            "league": {
                "id": 140,
                "name": "La Liga",
                "country": "Spain",
                "logo": "https://media.api-sports.io/football/leagues/140.png",
                "flag": "https://media.api-sports.io/flags/es.svg",
                "season": 2024,
                "round": "Regular Season - 3"
            },
            "teams": {
                "home": {
                    "id": 531,
                    "name": "Athletic Club",
                    "logo": "https://media.api-sports.io/football/teams/531.png",
                    "winner": null
                },
                "away": {
                    "id": 532,
                    "name": "Valencia",
                    "logo": "https://media.api-sports.io/football/teams/532.png",
                    "winner": null
                }
            },
            "goals": {
                "home": null,
                "away": null
            },
            "score": {
                "halftime": {
                    "home": null,
                    "away": null
                },
                "fulltime": {
                    "home": null,
                    "away": null
                },
                "extratime": {
                    "home": null,
                    "away": null
                },
                "penalty": {
                    "home": null,
                    "away": null
                }
            },
            "odds": {
                "update": "2024-08-28T08:00:24+00:00",
                "bets": [
                    {
                        "id": 1,
                        "name": "Match Winner",
                        "values": [
                            {
                                "value": "Home",
                                "odd": 1.65,
                                "_id": "66cf17f130624de3890859c5"
                            },
                            {
                                "value": "Draw",
                                "odd": 3.76,
                                "_id": "66cf17f130624de3890859c6"
                            },
                            {
                                "value": "Away",
                                "odd": 5.57,
                                "_id": "66cf17f130624de3890859c7"
                            }
                        ],
                        "_id": "66cf17f130624de3890859c4"
                    }
                ]
            }
        }
    },
    {
        "fixture_id": "1268085",
        "odds": "182",
        "outcome": 0,
        "user": "0xeccc2d38e0c721188830e96eff70fd1e5bf1319e29315c83a074c339325b16eb",
        "wager": "1000000",
        "fixtureData": {
            "fixture": {
                "periods": {
                    "first": null,
                    "second": null
                },
                "venue": {
                    "id": null,
                    "name": null,
                    "city": null
                },
                "status": {
                    "long": "Not Started",
                    "short": "NS",
                    "elapsed": null
                },
                "id": 1268085,
                "referee": null,
                "timezone": "UTC",
                "date": "2024-08-29T09:30:00+00:00",
                "timestamp": 1724923800
            },
            "league": {
                "id": 1020,
                "name": "Calcutta Premier Division",
                "country": "India",
                "logo": "https://media.api-sports.io/football/leagues/1020.png",
                "flag": "https://media.api-sports.io/flags/in.svg",
                "season": 2024,
                "round": "Regular Season - 15"
            },
            "teams": {
                "home": {
                    "id": 24103,
                    "name": "NA Suruchi Sangha",
                    "logo": "https://media.api-sports.io/football/teams/24103.png",
                    "winner": null
                },
                "away": {
                    "id": 24099,
                    "name": "Army XI",
                    "logo": "https://media.api-sports.io/football/teams/24099.png",
                    "winner": null
                }
            },
            "goals": {
                "home": null,
                "away": null
            },
            "score": {
                "halftime": {
                    "home": null,
                    "away": null
                },
                "fulltime": {
                    "home": null,
                    "away": null
                },
                "extratime": {
                    "home": null,
                    "away": null
                },
                "penalty": {
                    "home": null,
                    "away": null
                }
            },
            "odds": {
                "update": "2024-08-28T09:17:22+00:00",
                "bets": [
                    {
                        "id": 1,
                        "name": "Match Winner",
                        "values": [
                            {
                                "value": "Home",
                                "odd": 1.37,
                                "_id": "66cf17f630624de3890859d0"
                            },
                            {
                                "value": "Draw",
                                "odd": 4.13,
                                "_id": "66cf17f630624de3890859d1"
                            },
                            {
                                "value": "Away",
                                "odd": 7.45,
                                "_id": "66cf17f630624de3890859d2"
                            }
                        ],
                        "_id": "66cf17f630624de3890859cf"
                    }
                ]
            }
        }
    },
    {
        "fixture_id": "1268085",
        "odds": "182",
        "outcome": 1,
        "user": "0xeccc2d38e0c721188830e96eff70fd1e5bf1319e29315c83a074c339325b16eb",
        "wager": "1000000",
        "fixtureData": {
            "fixture": {
                "periods": {
                    "first": null,
                    "second": null
                },
                "venue": {
                    "id": null,
                    "name": null,
                    "city": null
                },
                "status": {
                    "long": "Not Started",
                    "short": "NS",
                    "elapsed": null
                },
                "id": 1268085,
                "referee": null,
                "timezone": "UTC",
                "date": "2024-08-29T09:30:00+00:00",
                "timestamp": 1724923800
            },
            "league": {
                "id": 1020,
                "name": "Calcutta Premier Division",
                "country": "India",
                "logo": "https://media.api-sports.io/football/leagues/1020.png",
                "flag": "https://media.api-sports.io/flags/in.svg",
                "season": 2024,
                "round": "Regular Season - 15"
            },
            "teams": {
                "home": {
                    "id": 24103,
                    "name": "NA Suruchi Sangha",
                    "logo": "https://media.api-sports.io/football/teams/24103.png",
                    "winner": null
                },
                "away": {
                    "id": 24099,
                    "name": "Army XI",
                    "logo": "https://media.api-sports.io/football/teams/24099.png",
                    "winner": null
                }
            },
            "goals": {
                "home": null,
                "away": null
            },
            "score": {
                "halftime": {
                    "home": null,
                    "away": null
                },
                "fulltime": {
                    "home": null,
                    "away": null
                },
                "extratime": {
                    "home": null,
                    "away": null
                },
                "penalty": {
                    "home": null,
                    "away": null
                }
            },
            "odds": {
                "update": "2024-08-28T09:17:22+00:00",
                "bets": [
                    {
                        "id": 1,
                        "name": "Match Winner",
                        "values": [
                            {
                                "value": "Home",
                                "odd": 1.37,
                                "_id": "66cf17f630624de3890859d0"
                            },
                            {
                                "value": "Draw",
                                "odd": 4.13,
                                "_id": "66cf17f630624de3890859d1"
                            },
                            {
                                "value": "Away",
                                "odd": 7.45,
                                "_id": "66cf17f630624de3890859d2"
                            }
                        ],
                        "_id": "66cf17f630624de3890859cf"
                    }
                ]
            }
        }
    }
]
  return (
    <div className="">
      <Slider {...settings} className="">
        {combinedData.map((machup:any, i:any) => (
          <div className="px-1" key={i}>
            <Card className="bg-white p-6  rounded-2xl h-52">
              <h2 className="text-center w-full">{machup.fixtureData.fixture.date}</h2>
              <div className="grid grid-cols-3 w-full ">
                <TeamCard teamName={machup.fixtureData.teams.home.name} teamLogo={machup.fixtureData.teams.home.logo} />
                <div className="flex justify-center h-auto items-center aspect-square">
                  <Image
                    src={"/assets/vs.png"}
                    width={40}
                    height={40}
                    alt="VS"
                  />
                </div>
                <TeamCard teamName={machup.fixtureData.teams.away.name} teamLogo={machup.fixtureData.teams.away.logo} />
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
