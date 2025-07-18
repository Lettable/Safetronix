-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stats table
CREATE TABLE IF NOT EXISTS stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('terrorism', 'abuse', 'dmca', 'extremism', 'fraud')),
  count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create discoveries table
CREATE TABLE IF NOT EXISTS discoveries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity TEXT NOT NULL,
  category TEXT NOT NULL,
  platform TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PARTIAL',
  confirmed BOOLEAN DEFAULT FALSE,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_category ON reports USING GIN(category);
CREATE INDEX IF NOT EXISTS idx_stats_date ON stats(date DESC);
CREATE INDEX IF NOT EXISTS idx_stats_category ON stats(category);
CREATE INDEX IF NOT EXISTS idx_discoveries_date ON discoveries(date DESC);
CREATE INDEX IF NOT EXISTS idx_discoveries_status ON discoveries(status);
CREATE INDEX IF NOT EXISTS idx_discoveries_confirmed ON discoveries(confirmed);
