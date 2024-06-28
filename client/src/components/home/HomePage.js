import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Home.css";

function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          src={`${process.env.PUBLIC_URL}/images/Carousel1.jpg`}
          alt="First slide"
          className="d-block w-100"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <p style={{ color: "white", fontWeight: "900" }}>
            According to WHO-Mental health is a state of mental well-being that enables people to
            cope with the stresses of life, realize their abilities, learn well and work well, and
            contribute to their community. It has intrinsic and instrumental value and is integral
            to our well-being.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          src={`${process.env.PUBLIC_URL}/images/Carousel2.jpg`}
          alt="Second slide"
          className="d-block w-100"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <p style={{ color: "white", fontWeight: "900" }}>
            970 million people worldwide have mental health or substance abuse disorders. Anxiety is
            the most common mental illness, affecting 284 million people, followed by depression,
            alcohol use disorder, drug use disorder, bipolar disorder, schizophrenia, and eating
            disorders.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={`${process.env.PUBLIC_URL}/images/Carousel3.jpg`}
          alt="Third slide"
          className="d-block w-100"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <p style={{ color: "white", fontWeight: "900" }}>
            1 in 7 teenagers will experience a mental disorder (World Health Organization) 3 in 5
            teen girls reported feeling sadness every day for at least two weeks (The New York
            Times) 51% of youth (6-17) with a mental health condition get treatment in a given year
            (National Alliance on Mental Illness)
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <HomeCarousel />
      <div className="custom-card">
        <div className="custom-card-body">
          <p>
            This website is a dedicated effort to support individuals struggling with various mental
            health issues. Here, you will find comprehensive information about common mental health
            conditions, including their causes, symptoms, and practical tips for managing and
            overcoming them.
          </p>
          <ul className="outer-list">
            <li>
              <h4>Educational Resources</h4>
              <hr />
              <p>
                Our website provides detailed articles on a range of mental health issues, such as
                anxiety, depression, burnout, OCD, ADHD, schizophrenia, and more. Each article
                covers why these issues commonly occur, the symptoms to look out for, and practical
                tips for managing these conditions. While the tips may not be suitable for everyone,
                they can be beneficial for those sensing the onset of these issues or in the early
                stages of experiencing them.
              </p>
            </li>
            <li>
              <h4>Professional Advice</h4>
              <hr />
              <p>
                For individuals who have been struggling with severe mental health issues for an
                extended period or experiencing continuous suicidal thoughts, we strongly recommend
                seeking help from a qualified therapist or mental health professional.
              </p>
            </li>
            <li>
              <h4>Journaling Section</h4>
              <hr />
              <p>
                Writing down your thoughts can be a powerful way to clear your mind. Our website
                offers a secure journaling section where you can document your thoughts and feelings
                without the need for pen and paper. Your journal entries are private and accessible
                only to you, ensuring your privacy and security.
              </p>
            </li>
            <li>
              <h4>Community Forum</h4>
              <hr />
              <p>
                Our forum page provides a platform where you can ask questions related to mental
                health, share your experiences, or offer support and advice to others. Engaging with
                the community can provide a sense of connection and understanding, helping you
                realize that you are not alone in your journey.
              </p>
            </li>
          </ul>
          <p>
            We are committed to protecting your privacy and ensuring a safe, supportive environment
            for everyone. Thank you for visiting our site, and we hope it serves as a valuable
            resource on your path to better mental health.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
