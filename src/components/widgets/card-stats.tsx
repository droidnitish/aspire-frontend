// src/components/widgets/card-stats.tsx
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaHome, FaBed, FaUser, FaTimesCircle } from 'react-icons/fa';

interface Stat {
  title: string;
  value: any;
  icon: JSX.Element;
}

interface CardStatsProps {
  stats: Stat[];
}

const CardStats: React.FC<CardStatsProps> = ({ stats }) => {
  return (
    <Row className="g-4">
      {stats.map((stat, index) => (
        <Col key={index} md={3}>
          <Card className="text-white" style={{ background: 'linear-gradient(to right, #007bff, #0056b3)' }}>
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="me-3">{stat.icon}</div>
                <div>
                  <Card.Title>{stat.title}</Card.Title>
                  <Card.Text>
                  <span style={{fontSize:20, fontWeight: 'bold'}}>{stat.value}</span>
                  </Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardStats;
