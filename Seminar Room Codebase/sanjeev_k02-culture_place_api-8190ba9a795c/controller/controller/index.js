var express = require("express");
var app = express();
var fs = require("fs"); //to access file structure
const saltRounds = 10;

var Sequelize = require("sequelize");
var _ = require("underscore");
var env = "dev";
// var env = "production";
var config = require("../config.json")[env];
var base64 = require("base-64");
var url = require("url");
var messages = require("../constants.json")["messages"];
var mailer = require("express-mailer");
var file_type_regex = /(?:\.([^.]+))?$/;
const download = require("image-downloader");
const fetch = require("node-fetch");
//production
// app.set('views', '/var/www/html/nearby-rest-apis/views');

//staging
app.set("views", "/var/culture-place-apis/views");
app.set("view engine", "ejs");
const Op = Sequelize.Op;
var geodist = require("geodist");
var dateFormat = require("node-datetime");
var moment = require("moment");
var request = require("request");

var FCM = require("fcm-node");
var serverKey = `AAAAzhxLFvI:APA91bFNDssDP0yvONg8opoxIuWlI-FwsUKn-oDUL_oe9-Eevs9H7iv788zi4M9Fn8Pjgq5fte8PIHvJeEi1cYHIjqhGzsf6mTy0P432jZMCx5Mhxx4LB6tC41kO0gvTnFXVhcKQqAVZ`;
var fcm = new FCM(serverKey);
var forEachAsync = require("async-foreach").forEach;
const jwtSecret = require("../config.json")["secret"];
const jwt = require("jsonwebtoken");
var mailerConfig = require("../config.json")["mailer"];
var appBuild = require("../config.json")["appBuild"];

mailer.extend(app, {
  from: mailerConfig.user,
  host: mailerConfig.host, // hostname
  secureConnection: true, // use SSL
  port: mailerConfig.port, //465, // port for secure SMTP
  transportMethod: "SMTP", // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: mailerConfig.user, // gmail id
    pass: mailerConfig.pass, // gmail password
  },
});

var sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  logging: console.log,
  dialect: config.dialect,
  define: {
    timestamps: false, //to not take created at, updated at on applying operation
  },
  sync: true,
});

// Razorpay Integration
const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: "rzp_test_G3W1XsDqK6oCmA",
  key_secret: "7uYwu0XmXSyQDpKJBQLJBqq6",
});

/*paths here*/
var proto = url.protocol;
var host = url.host;

/*to display images*/
var GLOBAL_URL = "https://cultureplace.in/"; /*to display images*/
var GLOBAL_IMAGES_URL = "https://cultureplace.in/admin/uploads/course_img/";
var LOCAL_IMAGES_URL =
  "/var/www/sync_folder/culture_place-v1/admin/uploads/course_img/"; /*to upload images*/
/*paths ends*/

/*All Models*/
const Courses = sequelize.define("courses", {
  category_id: {
    type: Sequelize.INTEGER,
  },
  partner_id: {
    type: Sequelize.INTEGER,
  },
  course_name: {
    type: Sequelize.STRING,
  },
  listing_order: {
    type: Sequelize.INTEGER,
  },
  type_of_course: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  take_away: {
    type: Sequelize.STRING,
  },
  age_group: {
    type: Sequelize.STRING,
  },
  duration: {
    type: Sequelize.STRING,
  },
  Schedule: {
    type: Sequelize.STRING,
  },
  fee_char: {
    type: Sequelize.STRING,
  },
  tag: {
    type: Sequelize.STRING,
  },
  Fee: {
    type: Sequelize.STRING,
  },
  date_created: {
    type: Sequelize.DATE,
  },
  active: {
    type: Sequelize.INTEGER,
  },
  date_updated: {
    type: Sequelize.DATE,
  },
  action_by: {
    type: Sequelize.STRING,
  },
  approved: {
    type: Sequelize.INTEGER,
  },
  course_type_id: {
    type: Sequelize.INTEGER,
  },
  thumbnail_img: {
    type: Sequelize.STRING,
  },
  details_img: {
    type: Sequelize.STRING,
  },
  banner_img: {
    type: Sequelize.STRING,
  },
  related_course: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
  },
  highlight_1: {
    type: Sequelize.STRING,
  },
  highlight_2: {
    type: Sequelize.STRING,
  },
});

const Category = sequelize.define("category", {
  category: {
    type: Sequelize.STRING,
  },
  color_code: {
    type: Sequelize.STRING,
  },
  list_order: {
    type: Sequelize.INTEGER,
  },
  active: {
    type: Sequelize.INTEGER,
  },
  insert_timestamp: {
    type: Sequelize.DATE,
  },
});

const Wishlist = sequelize.define(
  "wishlist",
  {
    user_id: {
      type: Sequelize.INTEGER,
    },
    course_id: {
      type: Sequelize.INTEGER,
    },
    user_mobile: {
      type: Sequelize.BIGINT,
    },
    last_created: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: "wishlist",
  }
);

const PushNotification = sequelize.define(
  "push_notification",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    device_token: { type: Sequelize.STRING },
    user_id: { type: Sequelize.INTEGER },
    created_at: { type: Sequelize.DATE },
    device_type: { type: Sequelize.ENUM("android", "ios") },
  },
  {
    tableName: "push_notification",
  }
);

const Collections = sequelize.define(
  "collections",
  {
    user_id: {
      type: Sequelize.INTEGER,
    },
    user_name: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "collections",
  }
);

const AppUsers = sequelize.define(
  "app_users",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    date_created: { type: Sequelize.DATE },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    phone: { type: Sequelize.BIGINT },
    city: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    pincode: { type: Sequelize.INTEGER },
    otp: { type: Sequelize.INTEGER },
  },
  {
    tableName: "app_users",
  }
);

const UsersRequest = sequelize.define(
  "users_request",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    date_created: { type: Sequelize.DATE },
    name_participant: { type: Sequelize.STRING },
    age: { type: Sequelize.STRING },
    parent_name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    phone: { type: Sequelize.BIGINT },
    address: { type: Sequelize.STRING },
    pincode: { type: Sequelize.INTEGER },
    details: { type: Sequelize.TEXT },
    course_id: { type: Sequelize.INTEGER },
    branch_id: { type: Sequelize.STRING },
    active: { type: Sequelize.INTEGER },
    respond_by: { type: Sequelize.STRING },
  },
  {
    tableName: "users_request",
  }
);

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h);
  return this;
};

const missingRequest = (type) => {
  return type + " is missing in request!";
};

//function of root
exports.pwd = function (req, res) {
  const nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });

  console.log(nDate);
  res.send(
    JSON.stringify({
      response: 1,
      status: true,
      message: "i am on home page",
      result: moment(new Date())
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD HH:mm:ss"),
    })
  );
};

exports.home = function (req, res) {
  console.log(req.body);
  Courses.findAll({
    where: {
      active: 1,
      status: 1,
    },
  }).then(
    function (resl) {
      if (resl.length > 0) {
        var data = JSON.stringify(resl);
        var finalData = JSON.parse(data);
        res.send({
          response: 1,
          status: true,
          message: messages.success,
          result: finalData,
        });
      } else {
        res.end(
          JSON.stringify({
            response: 3,
            status: false,
            message: messages.not_found,
          })
        );
      }
    },
    function (error) {
      console.log(error);
      res.end(
        JSON.stringify({
          response: 0,
          status: false,
          message: messages.common_error_msg,
        })
      );
    }
  );
};

exports.getCourseDetails = function (req, res) {
  let course_id = req.params.course_id;
  if (course_id) {
    Courses.find({
      where: {
        active: 1,
        status: 1,
        id: course_id,
      },
    }).then(
      function (resl) {
        if (resl) {
          var data = JSON.stringify(resl);
          var finalData = JSON.parse(data);
          res.send({
            response: 1,
            status: true,
            message: messages.success,
            result: finalData,
          });
        } else {
          res.end(
            JSON.stringify({
              response: 3,
              status: false,
              message: messages.not_found,
            })
          );
        }
      },
      function (error) {
        console.log(error);
        res.end(
          JSON.stringify({
            response: 0,
            status: false,
            message: messages.common_error_msg,
          })
        );
      }
    );
  } else {
    res.end(
      JSON.stringify({
        response: 3,
        status: false,
        message: "course id is missing in request!",
      })
    );
  }
};

exports.getAllCoursesName = function (req, res) {
  console.log(req.body);
  Courses.findAll(
    {
      attributes: ["course_name", "id"],
    },
    {
      where: {
        active: 1,
        status: 1,
      },
    }
  ).then(
    function (resl) {
      if (resl.length > 0) {
        var data = JSON.stringify(resl);
        var finalData = JSON.parse(data);
        res.send({
          response: 1,
          status: true,
          message: messages.success,
          result: finalData,
        });
      } else {
        res.end(
          JSON.stringify({
            response: 3,
            status: false,
            message: messages.not_found,
          })
        );
      }
    },
    function (error) {
      console.log(error);
      res.end(
        JSON.stringify({
          response: 0,
          status: false,
          message: messages.common_error_msg,
        })
      );
    }
  );
};

exports.getAllCategory = function (req, res) {
  console.log(req.body);
  sequelize
    .query("SELECT * FROM category WHERE active = 1", {
      model: Category,
    })
    .then(
      function (resl) {
        if (resl.length > 0) {
          var data = JSON.stringify(resl);
          var finalData = JSON.parse(data);
          res.send({
            response: 1,
            status: true,
            message: messages.success,
            result: finalData,
          });
        } else {
          res.end(
            JSON.stringify({
              response: 3,
              status: false,
              message: messages.not_found,
            })
          );
        }
      },
      function (error) {
        console.log(error);
        res.end(
          JSON.stringify({
            response: 0,
            status: false,
            message: messages.common_error_msg,
          })
        );
      }
    );
};

exports.getAllWishlist = function (req, res) {
  console.log(req.body);
  let user_id = req.body.user_id;
  if (user_id && user_id != null) {
    sequelize
      .query(
        `SELECT w.id as wishlist_id, c.id as course_id, c.course_name, c.description, c.take_away, c.age_group, c.duration, c.fee_char, c.Fee, c.thumbnail_img, c.details_img, c.banner_img, c.highlight_1, c.highlight_2, w.last_created FROM wishlist AS w JOIN courses AS c ON w.course_id =c.id where w.user_id = ${user_id} AND c.active = 1 AND c.status = 1`,
        {
          model: Wishlist,
        }
      )
      .then(
        function (resl) {
          if (resl.length > 0) {
            var data = JSON.stringify(resl);
            var finalData = JSON.parse(data);
            res.send({
              response: 1,
              status: true,
              message: messages.success,
              result: finalData,
            });
          } else {
            res.end(
              JSON.stringify({
                response: 3,
                status: false,
                message: messages.not_found,
              })
            );
          }
        },
        function (error) {
          console.log(error);
          res.end(
            JSON.stringify({
              response: 0,
              status: false,
              message: messages.common_error_msg,
            })
          );
        }
      );
  } else {
    res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: "user Id is missing in request!",
      })
    );
  }
};

exports.addWishlist = async function (req, res) {
  console.log(req.body);
  let timeStampDate = moment(new Date())
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");
  if (!req.body.user_id) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("user Id"),
      })
    );
  }

  if (!req.body.course_id) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Course Id"),
      })
    );
  }

  let wishlistData = await Wishlist.findOne({
    where: { user_id: req.body.user_id, course_id: req.body.course_id },
  });
  if (wishlistData != null) {
    return res.end(
      JSON.stringify({
        response: 1,
        status: true,
        message: messages.Wishlist_available,
      })
    );
  } else {
    Wishlist.create({
      user_id: req.body.user_id,
      course_id: req.body.course_id,
      user_mobile: req.body.user_mobile,
      last_created: timeStampDate,
    })
      .then((flag) => {
        res.end(
          JSON.stringify({
            response: 1,
            status: true,
            message: messages.wishlist_success_response,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        res.end(
          JSON.stringify({
            response: 0,
            status: false,
            message: messages.common_error_msg,
          })
        );
      });
  }
};

exports.removeWishlist = async function (req, res) {
  console.log(req.body);
  if (!req.body.user_id) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("user Id"),
      })
    );
  }

  if (!req.body.wishlist_id) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Wishlist Id"),
      })
    );
  }

  Wishlist.destroy({
    where: {
      user_id: req.body.user_id,
      id: req.body.wishlist_id,
    },
  })
    .then((flag) => {
      if (flag) {
        res.end(
          JSON.stringify({
            response: 1,
            status: true,
            message: messages.wishlist_delete_response,
          })
        );
      } else {
        res.end(
          JSON.stringify({
            response: 0,
            status: false,
            message: messages.not_found,
          })
        );
      }
    })
    .catch((err) => {
      console.log(err);
      res.end(
        JSON.stringify({
          response: 0,
          status: false,
          message: messages.common_error_msg,
        })
      );
    });
};

exports.searchCoursesByTitle = function (req, res) {
  let title = req.query.title;

  var whereStatement = {
    active: 1,
    status: 1,
  };
  if (title) whereStatement.course_name = { $like: "%" + title + "%" };

  Courses.findAll({
    where: whereStatement,
  }).then(
    function (resl) {
      if (resl) {
        var data = JSON.stringify(resl);
        var finalData = JSON.parse(data);
        res.send({
          response: 1,
          status: true,
          message: messages.success,
          result: finalData,
        });
      } else {
        res.end(
          JSON.stringify({
            response: 3,
            status: false,
            message: messages.not_found,
          })
        );
      }
    },
    function (error) {
      console.log(error);
      res.end(
        JSON.stringify({
          response: 0,
          status: false,
          message: messages.common_error_msg,
        })
      );
    }
  );
};

exports.save_fcm_token = function (req, res) {
  console.log(req.body);
  let timeStampDate = moment(new Date())
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");
  if (
    req.body.user_id != null &&
    req.body.user_id != "" &&
    req.body.device_token != null &&
    req.body.device_token != ""
  ) {
    PushNotification.findOne({
      where: {
        user_id: req.body.user_id,
        device_type: req.body.device_type,
      },
    }).then(
      (chkDevice) => {
        if (chkDevice == null) {
          PushNotification.create({
            user_id: req.body.user_id,
            device_token: req.body.device_token,
            device_type: req.body.device_type,
            created_at: timeStampDate,
          }).then(
            (createDevice) => {
              res.end(
                JSON.stringify({
                  response: 1,
                  status: true,
                  message: messages.success,
                  result: createDevice,
                })
              );
            },
            (err) => {
              console.log("error add device", err);
              res.end(
                JSON.stringify({
                  response: 0,
                  status: false,
                  message: messages.common_error_msg,
                })
              );
            }
          );
        } else {
          PushNotification.update(
            {
              device_token: req.body.device_token,
            },
            {
              where: {
                user_id: req.body.user_id,
                device_type: req.body.device_type,
              },
            }
          ).then(
            (updateDevice) => {
              res.end(
                JSON.stringify({
                  response: 1,
                  status: true,
                  message: messages.success,
                  result: updateDevice,
                })
              );
            },
            (err) => {
              res.end(
                JSON.stringify({
                  response: 0,
                  status: false,
                  message: messages.common_error_msg,
                })
              );
            }
          );
        }
      },
      (error) => {
        res.end(
          JSON.stringify({
            response: 0,
            status: false,
            message: messages.common_error_msg,
          })
        );
      }
    );
  } else {
    res.end(
      JSON.stringify({
        response: 2,
        status: false,
        message: messages.wrong_data,
      })
    );
  }
};

exports.remove_fcm_token = function (req, res) {
  if (
    req.body.user_id != null &&
    req.body.user_id != "" &&
    req.body.device_token != null &&
    req.body.device_token != ""
  ) {
    PushNotification.destroy({
      where: {
        user_id: req.body.user_id,
        device_token: req.body.device_token,
      },
    }).then(
      (removed) => {
        res.end(
          JSON.stringify({
            response: 1,
            status: true,
            message: messages.success,
          })
        );
      },
      (error) => {
        console.log(error);
        res.end(
          JSON.stringify({
            response: 0,
            status: false,
            message: messages.common_error_msg,
          })
        );
      }
    );
  } else {
    res.end(
      JSON.stringify({
        response: 2,
        status: false,
        message: messages.wrong_data,
      })
    );
  }
};

exports._sendPushNotification = async function (req, res) {
  let token = [];
  let title = req.body.title ? req.body.title : "Culture.Place";
  let description = req.body.description
    ? req.body.description
    : "new course added for you!";
  let type = req.body.type ? req.body.type : "android";

  let deviceToken = await PushNotification.findAll({
    where: {
      device_type: type,
    },
    attributes: ["device_token"],
  });
  if (deviceToken != null) {
    if (deviceToken.length > 0) {
      var data = JSON.stringify(deviceToken);
      var finalData = JSON.parse(data);

      finalData.map((item) => {
        // console.log(token, title, description, obj)
        var message = {
          //this may vary according to the message type (single recipient, multicast, topic, et cetera)
          to: item.device_token,
          // collapse_key: 'your_collapse_key',

          notification: {
            title: title,
            body: description,
            type: type,
          },

          data: {
            //you can send only notification or only data(or include both)
            title: title,
            body: description,
            type: type,
          },
        };

        fcm.send(message, function (err, response) {
          console.log(description);
          if (err) {
            console.log(err);
            console.log(
              "----------------------Something has gone wrong!--------"
            );
            res.end(
              JSON.stringify({
                response: 0,
                status: false,
                message: messages.common_error_msg,
              })
            );
          } else {
            console.log(
              "--------Successfully sent with response:------------- ",
              response
            );
            res.end(
              JSON.stringify({
                response: 1,
                status: true,
                message: message.success_notification_message,
              })
            );
          }
        });
      });
    } else {
      res.end(
        JSON.stringify({
          response: 0,
          status: false,
          message: "No device token found!",
        })
      );
    }
  } else {
    res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: messages.common_error_msg,
      })
    );
  }
};

exports.getAllTransaction = function (req, res) {
  console.log(req.body);
  let user_id = req.params.user_id;
  if (user_id && user_id != null) {
    sequelize
      .query(
        `SELECT collections.*, courses.course_name, courses.description, courses.thumbnail_img, courses.details_img, courses.banner_img FROM collections JOIN courses ON collections.course_id =courses.id where collections.user_id = ${user_id} AND courses.active = 1`,
        {
          model: Collections,
        }
      )
      .then(
        function (resl) {
          if (resl.length > 0) {
            var data = JSON.stringify(resl);
            var finalData = JSON.parse(data);
            res.send({
              response: 1,
              status: true,
              message: messages.success,
              result: finalData,
            });
          } else {
            res.end(
              JSON.stringify({
                response: 3,
                status: false,
                message: messages.not_found,
              })
            );
          }
        },
        function (error) {
          console.log(error);
          res.end(
            JSON.stringify({
              response: 0,
              status: false,
              message: messages.common_error_msg,
            })
          );
        }
      );
  } else {
    res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("User Id"),
      })
    );
  }
};

exports.profile = function (req, res) {
  let user_id = req.params.user_id;
  if (user_id) {
    AppUsers.find({
      where: {
        id: user_id,
      },
    }).then(
      function (resl) {
        if (resl) {
          var data = JSON.stringify(resl);
          var finalData = JSON.parse(data);
          res.send({
            response: 1,
            status: true,
            message: messages.success,
            result: finalData,
          });
        } else {
          res.end(
            JSON.stringify({
              response: 3,
              status: false,
              message: messages.not_found,
            })
          );
        }
      },
      function (error) {
        console.log(error);
        res.end(
          JSON.stringify({
            response: 0,
            status: false,
            message: messages.common_error_msg,
          })
        );
      }
    );
  } else {
    res.end(
      JSON.stringify({
        response: 3,
        status: false,
        message: missingRequest("user Id"),
      })
    );
  }
};

exports.updateProfile = async function (req, res) {
  console.log(req.body);
  if (!req.body.name) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Name"),
      })
    );
  }

  if (!req.body.email) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Email"),
      })
    );
  }

  if (!req.body.pincode) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Pincode"),
      })
    );
  }

  let userData = await AppUsers.findOne({
    where: { id: req.params.user_id },
  });
  if (userData == null) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: messages.data_not_updated,
      })
    );
  } else {
    AppUsers.update(
      {
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        address: req.body.address,
        pincode: req.body.pincode,
      },
      {
        where: {
          id: req.params.user_id,
        },
        returning: true,
        plain: true,
      }
    )
      .then(() => {
        return AppUsers.findById(req.params.user_id);
      })
      .then((user) =>
        res.end(
          JSON.stringify({
            response: 1,
            status: true,
            message: messages.success,
            result: user,
          })
        )
      )
      .catch((err) => {
        console.log(err);
        res.end(
          JSON.stringify({
            response: 0,
            status: false,
            message: messages.common_error_msg,
          })
        );
      });
  }
};

exports.validateOTP = async function (req, res) {
  console.log(req.body);
  if (!req.body.phone) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Phone Number"),
      })
    );
  }

  if (!req.body.otp) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("OTP"),
      })
    );
  }

  let appUsersData = await AppUsers.findOne({
    where: { phone: req.body.phone, otp: req.body.otp },
  });
  if (appUsersData) {
    return res.end(
      JSON.stringify({
        response: 1,
        status: true,
        message: messages.login_success,
        result: appUsersData,
      })
    );
  } else {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: messages.wrong_otp,
      })
    );
  }
};

function ValidatePhoneNumber(phone) {
  var str = phone + "";
  var res = str.substring(0, 6);
  return res + "XXXX";
}

function randomOTP() {
  let otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

function randomUserId() {
  var date = new Date();
  var components = [
    date.getYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  ];
  let timestamp = components.join("");
  return (
    "culture" + Math.floor(100000 + Math.random() * 900000) + "_" + timestamp
  );
}

exports.requestOTP = async function (req, res) {
  console.log(req.body);
  let timeStampDate = moment(new Date())
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");
  if (!req.body.phone) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Phone Number"),
      })
    );
  }

  // write logic for otp send
  let sendOTP = randomOTP();
  let message = "your OTP " + sendOTP + " is to access for Culture.Place";
  let number = "91" + req.body.phone;
  let currentDateTime = timeStampDate;

  /*API URL*/
  let sms_url = "http://65.0.41.187:8083/sendingSms";
  await fetch(sms_url, {
    method: "POST",
    body: JSON.stringify({
      campaign: "justbooks",
      contactNo: number,
      smsText: message,
      dateTime: currentDateTime,
      messageType: "TRANSACTIONAL",
      userId: randomUserId(),
      vendorId: 2,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(async function () {
      let appUsersData = await AppUsers.findOne({
        where: { phone: req.body.phone },
      });
      if (appUsersData) {
        // write logic for update data with new otp
        AppUsers.update(
          {
            otp: sendOTP,
          },
          {
            where: {
              phone: req.body.phone,
            },
            returning: true,
          }
        )
          .then((flag) =>
            res.end(
              JSON.stringify({
                response: 1,
                status: true,
                message:
                  "OTP successfully send to " +
                  ValidatePhoneNumber(req.body.phone),
              })
            )
          )
          .catch((err) => {
            console.log(err);
            res.end(
              JSON.stringify({
                response: 0,
                status: false,
                message: messages.common_error_msg,
              })
            );
          });
      } else {
        // write logic for insert data with new otp and phone
        AppUsers.create({
          phone: req.body.phone,
          otp: sendOTP,
          date_created: timeStampDate,
        })
          .then((flag) => {
            res.end(
              JSON.stringify({
                response: 1,
                status: true,
                message:
                  "OTP successfully send to " +
                  ValidatePhoneNumber(req.body.phone),
              })
            );
          })
          .catch((err) => {
            console.log(err);
            res.end(
              JSON.stringify({
                response: 0,
                status: false,
                message: messages.common_error_msg,
              })
            );
          });
      }
    })
    .catch((err) => {
      console.log("err", err);
      return res.end(
        JSON.stringify({
          response: 0,
          status: false,
          message: messages.common_error_msg,
        })
      );
    });
};

exports.registerInitiation = async function (req, res) {
  // name_participant, age, parent_name, email, phone, address, pincode, course_id, details
  if (!req.body.name_participant) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Name"),
      })
    );
  }
  if (!req.body.age) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Age Group"),
      })
    );
  }
  if (!req.body.email) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Email"),
      })
    );
  }
  if (!req.body.phone) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Phone"),
      })
    );
  }
  if (!req.body.course_id) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Course"),
      })
    );
  }

  let timeStampDate = moment(new Date())
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");

  UsersRequest.create({
    date_created: timeStampDate,
    name_participant: req.body.name_participant,
    age: req.body.age,
    parent_name: req.body.parent_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    pincode: req.body.pincode,
    details: req.body.details,
    course_id: req.body.course_id,
    branch_id: 2,
    active: 1,
    respond_by: "Waiting for response",
  })
    .then((flag) => {
      return res.end(
        JSON.stringify({
          response: 1,
          status: true,
          message: messages.user_request,
        })
      );
    })
    .catch((err) => {
      console.log(err);
      return res.end(
        JSON.stringify({
          response: 0,
          status: false,
          message: messages.common_error_msg,
        })
      );
    });
};

exports.initiationPayment = async function (req, res) {
  console.log("body", req.body);
  let currency = "INR";
  let amount = req.body.amount;
  if (!amount) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Amount"),
      })
    );
  }

  try {
    const options = {
      amount: 100 * parseInt(amount),
      currency: currency,
      receipt: "culture#" + Math.floor(1000 + Math.random() * 9000),
      payment_capture: 0, // 1 for automatic capture // 0 for manual capture
    };
    instance.orders.create(options, async function (err, order) {
      if (err) {
        return res.end(
          JSON.stringify({
            response: 0,
            status: false,
            message: messages.order_creation_issue,
          })
        );
      }
      return res.end(
        JSON.stringify({
          response: 1,
          status: true,
          message: messages.initiation_payment,
          result: order,
        })
      );
    });
  } catch (err) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: messages.common_error_msg,
      })
    );
  }
};

exports.finalPayment = async function (req, res) {
  console.log("body", req.body);
  let currency = "INR";
  let user_id = req.body.user_id;
  let amount = req.body.amount;
  let paymentId = req.params.paymentId;
  if (!user_id) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("User Id"),
      })
    );
  }

  if (!amount) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Amount"),
      })
    );
  }

  if (!paymentId) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: missingRequest("Payment Id"),
      })
    );
  }

  try {
    fetch(
      {
        method: "POST",
        url: `https://${config.RAZOR_PAY_KEY_ID}:${config.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${paymentId}/capture`,
        form: {
          amount: 100 * parseInt(amount),
          currency: currency,
        },
      },
      async function (err, payment_response, body) {
        if (err) {
          return res.end(
            JSON.stringify({
              response: 0,
              status: false,
              message: messages.common_error_msg,
            })
          );
        }
        console.log("Status:", payment_response.statusCode);
        console.log("Headers:", JSON.stringify(payment_response.headers));
        console.log("Response:", body);
        if (payment_response.captured) {
          // write logic to insert payment information to Collection Table

          Collections.create({
            user_id: req.body.user_id,
            user_name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            address: req.body.address,
            details: req.body.details,
            course_id: req.body.course_id,
            branch_id: 2,
            name_offront_staff: "Paid By User",
            amount_collected: payment_response.amount,
            modeofpayment: payment_response.method,
            reference_number: req.body.payment_id,
            invoice: req.body.payment_order_id,
            sign: req.body.payment_sign,
            status:payment_response.status,
            payment_date: payment_response.created_at,
            date_created: payment_response.created_at,
            active: 1
          })
            .then((flag) => {
              return res.end(
                JSON.stringify({
                  response: 1,
                  status: true,
                  message: messages.payment_success,
                  result: payment_response,
                })
              );
            })
            .catch((err) => {
              console.log(err);
              res.end(
                JSON.stringify({
                  response: 0,
                  status: false,
                  message: messages.common_error_msg,
                })
              );
            });

          return res.end(
            JSON.stringify({
              response: 1,
              status: true,
              message: messages.payment_success,
              result: payment_response,
            })
          );
        } else {
          return res.end(
            JSON.stringify({
              response: 0,
              status: false,
              message: messages.payment_failed,
            })
          );
        }
      }
    );
  } catch (err) {
    return res.end(
      JSON.stringify({
        response: 0,
        status: false,
        message: messages.common_error_msg,
      })
    );
  }
};

function versionCompare(appVer, configuredVersion) {
  // This will split both the versions by '.'
  let appVerArr = appVer.split(".");
  let configuredVersionArr = configuredVersion.split(".");

  //Initializer for the version arrays
  let i = 0;

  // We have taken into consideration that both the
  // versions will contains equal number of delimiters
  while (i < appVerArr.length) {
    // Version 2 is greater than version 1
    if (parseInt(configuredVersionArr[i]) > parseInt(appVerArr[i])) return -1;

    // Version 1 is greater than version 2
    if (parseInt(appVerArr[i]) > parseInt(configuredVersionArr[i])) return 1;

    //We can't conclude till now
    i += 1;
  }
  // Both the versions are equal
  return 0;
}

exports.checkAppVersion = function (req, res) {
  const TARGET_URL = "https://cultureplace.in";
  const BANNER_URL =
    "https://cultureplace.in/public/admin/imgs/content_management/home_page_images/slider/1590931831_87361.png";
  const BANNER_TEXT = "Go Get It !";
  let { app_ver, os } = req.query;
  if (!os || !app_ver) {
    return res.json({
      response: 2,
      message: messages.wrong_data,
      // result:data
    });
  }
  let appBuildForOs = appBuild[os];
  if (!appBuildForOs)
    res.end(
      JSON.stringify({
        response: 2,
        message: "Sorry we are not available on this platform",
      })
    );
  let compareAppVerToLatestVer = versionCompare(
    app_ver,
    appBuildForOs.latestVersion
  );
  let compareAppVerToMinVer = versionCompare(
    app_ver,
    appBuildForOs.minimumVersionAllowed
  );

  if (compareAppVerToLatestVer >= 0) {
    return res.json({
      response: 1,
      message: "",
      data: {
        message: "You are a real nerd, you are always up to date",
        update_warn_level: 0, //Do nothing
        banner: {
          target: TARGET_URL,
          img_url: BANNER_URL,
          action_text: BANNER_TEXT,
        },
      },
    });
  }
  //  app_ver <= appBuildForOs.minimumVersionAllowed
  if (compareAppVerToMinVer < 0) {
    // force_update_msg
    return res.json({
      message: "",
      response: 1,
      data: {
        message: "Please update your app to continue using app features !",
        update_warn_level: 2, //Force update
      },
    });
  } else {
    // update_warning
    return res.json({
      message: "",
      response: 1,
      data: {
        message: "Please update your app to access latest features !",
        update_warn_level: 1, //Show warning
      },
    });
  }
};
