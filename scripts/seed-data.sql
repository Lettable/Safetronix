-- Insert sample stats data
INSERT INTO stats (date, category, count) VALUES
('2024-01-01', 'terrorism', 12),
('2024-01-01', 'abuse', 8),
('2024-01-01', 'dmca', 25),
('2024-01-01', 'extremism', 15),
('2024-01-01', 'fraud', 10),
('2024-01-02', 'terrorism', 15),
('2024-01-02', 'abuse', 12),
('2024-01-02', 'dmca', 30),
('2024-01-02', 'extremism', 18),
('2024-01-02', 'fraud', 14),
('2024-01-03', 'terrorism', 10),
('2024-01-03', 'abuse', 6),
('2024-01-03', 'dmca', 22),
('2024-01-03', 'extremism', 12),
('2024-01-03', 'fraud', 8);

-- Insert sample reports
INSERT INTO reports (name, platform, description, category) VALUES
('Anonymous', 'Dark Web', 'Suspicious terrorist recruitment forum discovered', ARRAY['terrorism']),
('ThreatHunter', 'Telegram', 'Child exploitation material being distributed', ARRAY['abuse']),
('DigitalGuard', 'BitTorrent', 'Large-scale piracy operation', ARRAY['dmca']),
('CyberWatch', 'Social Media', 'Extremist content promoting violence', ARRAY['extremism']);
