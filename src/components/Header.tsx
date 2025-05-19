
import React from 'react';
import { MessageSquare, BookOpen, TrendingUp, SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  return (
    <header className="py-4 px-6 bg-white shadow-md w-full z-10 border-b border-purple-100">
      <div className="container max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Avatar className="w-10 h-10 rounded-full shadow-md">
            <AvatarImage src="/lovable-uploads/112953cb-ad22-42b9-8cc5-80a48e065301.png" alt="Guru do PCP" />
            <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white font-bold">G</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Guru do PCP
            </h1>
            <p className="text-xs text-muted-foreground">Especialista em PCP e Logística</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <MessageSquare size={16} />
            <span>Chat</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen size={16} />
            <span>Recursos</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp size={16} />
            <span>Análises</span>
          </div>
          <Link to="/settings" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <SettingsIcon size={16} />
            <span>Configurações</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
