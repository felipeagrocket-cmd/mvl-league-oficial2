import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Trophy,
  Swords,
  TrendingUp,
  Users,
  Calendar,
  Medal,
  Lock,
  LogOut,
  ChevronRight,
  Plus,
  AlertCircle,
  CheckCircle,
  Home,
  Newspaper,
  Trash2,
  Upload,
  Image as ImageIcon,
  Map as MapIcon,
  Power,
  PowerOff,
  RefreshCcw,
  Pencil,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Activity,
  Crown,
  Gavel,
  Ban,
  Clock,
  AlertTriangle,
  Shield,
  Target,
  Settings,
  GripVertical,
  Handshake,
  History as HistoryIcon,
  UserCheck,
  Layers,
  Square,
  UserPlus,
  UserMinus,
  Briefcase,
  DollarSign,
  ArrowRightLeft,
  ShoppingBag,
  Banknote,
  Info,
  Landmark,
  FileText,
  Zap,
  Search,
  Play,
  Check,
  LayoutTemplate,
  ShoppingCart,
  Package,
  Tag,
  Wallet,
} from "lucide-react";

import { db as firebaseDb } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);
const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const salvarNoFirebase = async (colecao, dados) => {
  try {
    const idParaSalvar = dados.id || generateId();
    await setDoc(doc(firebaseDb, colecao, idParaSalvar), {
      ...dados,
      id: idParaSalvar,
    });
  } catch (e) {
    console.error(`Erro ao salvar na coleção ${colecao}:`, e);
  }
};

const SEED_CLANS = [
  {
    id: "clan1",
    name: "Vanguard Elite",
    tag: "VGD",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/9406/9406324.png",
    budget: 150000000,
  },
  {
    id: "clan2",
    name: "Shadow Stalkers",
    tag: "SHD",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/13094/13094960.png",
    budget: 120000000,
  },
  {
    id: "clan3",
    name: "Imperial eSports",
    tag: "IMP",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png",
    budget: 130000000,
  },
  {
    id: "clan4",
    name: "LOUD",
    tag: "LLL",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/4436/4436481.png",
    budget: 140000000,
  },
];

const SEED_PLAYERS = [
  {
    id: "1001",
    nickname: "KondZilla",
    gameId: "KondZilla#BR1",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=KondZilla",
    isPaused: false,
    clanId: "clan1",
    marketValue: 10000000,
    contractEnd: "2026-12-31",
    releaseClauseMultiplier: 0.4,
    totalEarnings: 500000,
    inventory: [],
  },
  {
    id: "1002",
    nickname: "NEWWORK",
    gameId: "NEWWORK#BR1",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=NEWWORK",
    isPaused: false,
    clanId: "clan1",
    marketValue: 10000000,
    contractEnd: "2026-06-30",
    releaseClauseMultiplier: 0.2,
    totalEarnings: 150000,
    inventory: [],
  },
  {
    id: "1003",
    nickname: "Wolverine",
    gameId: "Wolverine#BR1",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wolverine",
    isPaused: false,
    clanId: null,
    marketValue: 12000000,
    contractEnd: null,
    releaseClauseMultiplier: 0,
    totalEarnings: 0,
    inventory: [],
  },
  {
    id: "1004",
    nickname: "Gusta",
    gameId: "Gusta#BR1",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gusta",
    isPaused: false,
    clanId: "clan2",
    marketValue: 22000000,
    contractEnd: "2026-02-28",
    releaseClauseMultiplier: 0.3,
    totalEarnings: 1200000,
    inventory: [],
  },
];

const SEED_TRANSFERS = [
  {
    id: "t1",
    type: "contract",
    playerId: "1001",
    fromClanId: null,
    toClanId: "clan1",
    date: "2024-01-10",
    value: 15000000,
    playerName: "KondZilla",
    toClanName: "Vanguard Elite",
    isHostile: false,
  },
];
const SEED_FINANCIAL_LOGS = [
  {
    id: "fl1",
    clanId: "clan1",
    type: "initial",
    amount: 150000000,
    oldBalance: 0,
    newBalance: 150000000,
    reason: "Orçamento Inicial",
    date: "2024-01-01T10:00:00.000Z",
  },
];
const SEED_MAPS = [
  { id: "m1", name: "Frankfurt", isActive: true },
  { id: "m2", name: "Red Dawn", isActive: true },
];
const SEED_CHAMPIONSHIPS = [
  {
    id: "c1",
    name: "Liga MVL - Série A",
    trophyUrl: "https://cdn-icons-png.flaticon.com/512/5906/5906051.png",
  },
];
const SEED_NEWS = [
  {
    id: "1",
    title: "Nova Era na Liga!",
    content: "O formato de Clãs começou.",
    imageUrl:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600",
    date: "2024-02-01",
  },
];
const SEED_BANNED = [];
const SEED_SPONSORS = [
  {
    id: "sp1",
    name: "Razer",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/5969/5969065.png",
    type: "fixed",
    amount: 50000,
    clanId: "clan1",
  },
  {
    id: "sp2",
    name: "Red Bull",
    logoUrl: "https://cdn-icons-png.flaticon.com/512/12300/12300236.png",
    type: "victory",
    amount: 200000,
    clanId: "clan2",
  },
];

const SEED_STORE_ITEMS = [
  {
    id: "item1",
    name: "Skin Dourada (In-Game)",
    category: "ingame",
    price: 150000,
    stock: 5,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1867/1867123.png",
    isPremium: false,
  },
  {
    id: "item2",
    name: "Borda de Perfil Neon",
    category: "cosmetic",
    price: 50000,
    stock: 99,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/10043/10043329.png",
    isPremium: false,
  },
  {
    id: "item3",
    name: "Passe VIP MVL",
    category: "premium",
    price: 0,
    stock: 10,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3673/3673196.png",
    isPremium: true,
  },
];

const DEFAULT_SETTINGS = {
  siteName: "MVL",
  heroBackgroundUrl: "https://i.imgur.com/nLNN3Rk.png",
  marketStatus: "open",
  marketReopenDate: "",
};

const DEFAULT_ADMIN_MENU_ORDER = [
  "tournament",
  "market",
  "clans",
  "sponsors",
  "store",
  "championships",
  "maps",
  "news",
  "splits",
  "players",
  "bans",
  "settings",
];

const ADMIN_MENU_CONFIG = {
  tournament: { label: "Central do Torneio", icon: Trophy },
  market: { label: "Mercado da Bala", icon: DollarSign },
  clans: { label: "Gerenciar Clãs", icon: Users },
  sponsors: { label: "Patrocínios", icon: Handshake },
  store: { label: "Lojinha VIP", icon: ShoppingCart },
  championships: { label: "Campeonatos", icon: Shield },
  maps: { label: "Map Pool", icon: MapIcon },
  news: { label: "Gerenciar Notícias", icon: Newspaper },
  splits: { label: "Gerenciar Splits", icon: Calendar },
  players: { label: "Jogadores", icon: UserPlus },
  bans: { label: "Banimentos", icon: Gavel },
  settings: { label: "Configurações do Site", icon: Settings },
};

const getContractStatus = (player) => {
  if (!player.clanId || !player.contractEnd)
    return {
      status: "Free Agent",
      color: "text-slate-400",
      isExpiring: false,
      isValid: false,
    };
  const end = new Date(player.contractEnd);
  const now = new Date();
  const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0)
    return {
      status: "Sem Contrato",
      color: "text-red-400",
      isExpiring: true,
      isValid: false,
    };
  if (diffDays <= 7)
    return {
      status: "Reta Final",
      color: "text-amber-400",
      isExpiring: true,
      isValid: true,
      daysLeft: diffDays,
    };
  return {
    status: "Blindado",
    color: "text-emerald-400",
    isExpiring: false,
    isValid: true,
    daysLeft: diffDays,
  };
};

const calculateReleaseClause = (marketValue, multiplier) =>
  !multiplier ? 0 : marketValue * multiplier;

// --- SISTEMA DE COSMÉTICOS E UI ---
const checkCosmetics = (player) => {
  const inventory = player?.inventory || [];

  // Agora o Dourado só ativa se o NOME do item tiver "VIP" ou "Premium MVL"
  const isPremium = inventory.some(
    (i) =>
      i.name.toLowerCase().includes("vip") ||
      i.name.toLowerCase().includes("premium mvl")
  );

  const hasNeon = inventory.some((i) => i.name.toLowerCase().includes("neon"));

  return {
    isPremium,
    hasNeon,
    nameClass: isPremium
      ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
      : hasNeon
      ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
      : "text-white group-hover:text-amber-400",
    avatarRing: isPremium
      ? "ring-2 ring-amber-400 border border-yellow-200/80 relative z-10 shadow-[0_0_25px_rgba(251,191,36,0.7)] group-hover:rotate-3 group-hover:scale-105"
      : hasNeon
      ? "ring-2 ring-cyan-400 border border-blue-200/80 relative z-10 shadow-[0_0_25px_rgba(34,211,238,0.7)] group-hover:-rotate-3 group-hover:scale-105"
      : "border border-slate-700 shadow-sm relative z-10",
    fireProfile: isPremium
      ? "absolute -inset-3 bg-gradient-to-tr from-amber-600 via-yellow-300 to-orange-600 rounded-[2rem] blur-xl animate-pulse opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"
      : hasNeon
      ? "absolute -inset-3 bg-gradient-to-tr from-cyan-600 via-blue-400 to-cyan-300 rounded-[2rem] blur-xl animate-pulse opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"
      : "hidden",
    fireCard: isPremium
      ? "absolute -inset-1.5 bg-gradient-to-tr from-amber-600 via-yellow-400 to-orange-600 rounded-2xl blur-lg animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-0"
      : hasNeon
      ? "absolute -inset-1.5 bg-gradient-to-tr from-cyan-600 via-blue-500 to-cyan-300 rounded-2xl blur-lg animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-0"
      : "hidden",
  };
};

class BackendController {
  constructor(initialData) {
    this.db = initialData;
  }
  calculateKD(kills, deaths) {
    return deaths === 0 ? kills : Number((kills / deaths).toFixed(2));
  }

  calculateDynamicMarketValue(player, stats) {
    if (!stats || !stats.totalMatches) return 10000000;
    let finalValue =
      10000000 +
      (stats.totalKills / stats.totalMatches) * 1000000 +
      (stats.winRate / 100) * 15000000;
    const kd = stats.totalKD || 0;
    if (kd >= 1.5) finalValue *= 1.45;
    else if (kd >= 1.2) finalValue *= 1.25;
    else if (kd >= 1.0) finalValue *= 1.1;
    else if (kd < 0.8) finalValue *= 0.85;
    if (stats.totalMatches < 3) finalValue *= 0.75;
    else if (stats.totalMatches >= 10) finalValue *= 1.05;

    // Aplica o Soft Reset (Desvalorização Acumulada de Temporada)
    finalValue *= player.devaluationMultiplier || 1;

    return Math.round(finalValue / 100000) * 100000;
  }

  getSeriesStatus(series) {
    if (!series || !series.matchIds) return null;
    const matches = this.db.matches.filter((m) =>
      series.matchIds.includes(m.id)
    );
    let wA = 0,
      wB = 0;
    matches.forEach((m) => {
      if (m.winnerSide === "A") wA++;
      if (m.winnerSide === "B") wB++;
    });
    return {
      ...series,
      winsA: wA,
      winsB: wB,
      matches,
      status:
        wA >= 2 || wB >= 2 || matches.length === 3
          ? "Finalizada"
          : "Em Andamento",
      finalWinner: wA > wB ? "A" : wB > wA ? "B" : null,
    };
  }

  getClanStandings(splitId) {
    const matches = this.db.matches.filter(
      (m) => m.splitId === splitId && m.clanA_Id && m.clanB_Id
    );
    const clanMap = {};
    this.db.clans.forEach((c) => {
      clanMap[c.id] = {
        ...c,
        matches: 0,
        wins: 0,
        losses: 0,
        mapDiff: 0,
        points: 0,
      };
    });

    matches.forEach((m) => {
      const cA = clanMap[m.clanA_Id];
      const cB = clanMap[m.clanB_Id];
      if (!cA || !cB) return;
      cA.matches += 1;
      cB.matches += 1;
      const sA = m.scoreA || 0;
      const sB = m.scoreB || 0;
      cA.mapDiff += sA - sB;
      cB.mapDiff += sB - sA;

      if (m.winnerSide === "A") {
        cA.wins += 1;
        cB.losses += 1;
        cA.points += 3;
      } else if (m.winnerSide === "B") {
        cB.wins += 1;
        cA.losses += 1;
        cB.points += 3;
      }
    });
    return Object.values(clanMap)
      .filter((c) => c.matches > 0)
      .sort(
        (a, b) =>
          b.points - a.points || b.mapDiff - a.mapDiff || b.wins - a.wins
      );
  }

  getClanTitles(clanId) {
    return this.db.splits
      .filter((s) => s.isFinished && s.format === "cxc")
      .map((s) => {
        let winClanId = null;
        const finals = this.db.matches.find(
          (m) => m.splitId === s.id && m.stage === "Grande Final"
        );
        if (finals) {
          winClanId =
            finals.winnerSide === "A" ? finals.clanA_Id : finals.clanB_Id;
        } else {
          const standings = this.getClanStandings(s.id);
          if (standings.length > 0) winClanId = standings[0].id;
        }
        if (winClanId === clanId) {
          const championship = this.db.championships.find(
            (c) => c.id === s.championshipId
          );
          return {
            splitName: s.name,
            date: s.endDate,
            championshipName: championship?.name,
            trophyUrl: championship?.trophyUrl,
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  getClanHistory(clanId) {
    const matches = this.db.matches
      .filter((m) => m.clanA_Id === clanId || m.clanB_Id === clanId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return matches.map((m) => {
      const isTeamA = m.clanA_Id === clanId;
      const enemyId = isTeamA ? m.clanB_Id : m.clanA_Id;
      const enemyClan = this.db.clans.find((c) => c.id === enemyId);
      const isWin =
        (isTeamA && m.winnerSide === "A") || (!isTeamA && m.winnerSide === "B");
      const split = this.db.splits.find((s) => s.id === m.splitId);
      return {
        ...m,
        isWin,
        splitName: split?.name || "Split",
        enemyName: enemyClan?.name || "Desconhecido",
        enemyTag: enemyClan?.tag || "UNK",
        enemyLogo: enemyClan?.logoUrl,
        myScore: isTeamA ? m.scoreA : m.scoreB,
        enemyScore: isTeamA ? m.scoreB : m.scoreA,
      };
    });
  }

  getPlayerStatsForSplit(splitId) {
    const matchIds = this.db.matches
      .filter((m) => m.splitId === splitId)
      .map((m) => m.id);
    const map = {};
    this.db.players.forEach((p) => {
      map[p.id] = {
        playerId: p.id,
        nickname: p.nickname,
        avatarUrl: p.avatarUrl,
        clanTag: this.db.clans.find((c) => c.id === p.clanId)?.tag,
        isPaused: p.isPaused,
        points: 0,
        kills: 0,
        deaths: 0,
        marketValue: p.marketValue,
        pointsBreakdown: { kills: 0, kdBonus: 0, mapWins: 0, md3Wins: 0 },
        inventory: p.inventory,
      };
    });
    this.db.stats
      .filter((s) => matchIds.includes(s.matchId))
      .forEach((s) => {
        const p = map[s.playerId];
        if (!p) return;
        p.kills += s.kills;
        p.deaths += s.deaths;
        p.points += s.kills;
        p.pointsBreakdown.kills += s.kills;
        if ((s.deaths === 0 ? s.kills : s.kills / s.deaths) >= 1) {
          p.points += 1;
          p.pointsBreakdown.kdBonus += 1;
        }
        if (s.mapWin) {
          p.points += 1;
          p.pointsBreakdown.mapWins += 1;
        }
        if (s.md3Win) {
          p.points += 3;
          p.pointsBreakdown.md3Wins += 3;
        }
      });
    return Object.values(map)
      .map((p) => ({ ...p, kd: this.calculateKD(p.kills, p.deaths) }))
      .sort((a, b) => b.points - a.points || b.kd - a.kd || b.kills - a.kills);
  }

  getGlobalRanking() {
    const map = {};
    this.db.players.forEach((p) => {
      map[p.id] = {
        playerId: p.id,
        nickname: p.nickname,
        avatarUrl: p.avatarUrl,
        clanTag: this.db.clans.find((c) => c.id === p.clanId)?.tag,
        points: 0,
        kills: 0,
        deaths: 0,
        marketValue: p.marketValue,
        inventory: p.inventory,
      };
    });
    this.db.stats.forEach((s) => {
      const p = map[s.playerId];
      if (!p) return;
      p.kills += s.kills;
      p.deaths += s.deaths;
      p.points += s.kills;
      if ((s.deaths === 0 ? s.kills : s.kills / s.deaths) >= 1) p.points += 1;
      if (s.mapWin) p.points += 1;
      if (s.md3Win) p.points += 3;
    });
    return Object.values(map)
      .map((p) => ({ ...p, kd: this.calculateKD(p.kills, p.deaths) }))
      .sort((a, b) => b.points - a.points || b.kd - a.kd);
  }

  getChampion() {
    const finishedSplits = this.db.splits.filter((s) => s.isFinished);
    if (finishedSplits.length === 0) return null;
    const lastSplit = finishedSplits[finishedSplits.length - 1];

    if (lastSplit.format === "cxc") {
      const finals = this.db.matches.find(
        (m) => m.splitId === lastSplit.id && m.stage === "Grande Final"
      );
      if (finals) {
        const winId =
          finals.winnerSide === "A" ? finals.clanA_Id : finals.clanB_Id;
        const clan = this.db.clans.find((c) => c.id === winId);
        if (clan) return { type: "clan", data: clan };
      }
      const standings = this.getClanStandings(lastSplit.id);
      if (standings.length > 0) return { type: "clan", data: standings[0] };
      return null;
    } else {
      const ranking = this.getPlayerStatsForSplit(lastSplit.id);
      if (ranking.length === 0) return null;
      const winnerId = ranking[0].playerId;
      const player = this.db.players.find((p) => p.id === winnerId);
      if (!player) return null;
      const clan = this.db.clans.find((c) => c.id === player.clanId);
      return { type: "player", data: { ...player, clanTag: clan?.tag } };
    }
  }

  getPlayerFullProfile(pid) {
    const player = this.db.players.find((p) => p.id === pid);
    if (!player) return null;
    const clan = this.db.clans.find((c) => c.id === player.clanId);
    const stats = this.db.stats.filter((s) => s.playerId === pid);
    const history = stats
      .map((s) => {
        const m = this.db.matches.find((x) => x.id === s.matchId);
        const sp = this.db.splits.find((x) => x.id === m?.splitId);
        return {
          ...s,
          matchDate: m?.date || "",
          mapName: m?.mapName,
          md3GroupId: m?.md3GroupId,
          scoreA: m?.scoreA,
          scoreB: m?.scoreB,
          winnerSide: m?.winnerSide,
          splitName: sp?.name,
          splitId: sp?.id,
          matchKD: this.calculateKD(s.kills, s.deaths),
        };
      })
      .sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate));

    const titles = this.db.splits
      .filter((s) => s.isFinished)
      .map((s) => {
        const championship = this.db.championships.find(
          (c) => c.id === s.championshipId
        );
        if (!s.format || s.format === "mix") {
          const r = this.getPlayerStatsForSplit(s.id);
          if (r.length && r[0].playerId === pid)
            return {
              splitName: s.name,
              date: s.endDate,
              championshipName: championship?.name,
              trophyUrl: championship?.trophyUrl,
            };
        } else if (s.format === "cxc") {
          let winClanId = null;
          const finals = this.db.matches.find(
            (m) => m.splitId === s.id && m.stage === "Grande Final"
          );
          if (finals)
            winClanId =
              finals.winnerSide === "A" ? finals.clanA_Id : finals.clanB_Id;
          else {
            const standings = this.getClanStandings(s.id);
            if (standings.length > 0) winClanId = standings[0].id;
          }
          if (winClanId && player.clanId === winClanId)
            return {
              splitName: s.name,
              date: s.endDate,
              championshipName: championship?.name,
              trophyUrl: championship?.trophyUrl,
            };
        }
        return null;
      })
      .filter(Boolean);

    const mapStats = {};
    history.forEach((h) => {
      if (!mapStats[h.mapName])
        mapStats[h.mapName] = { played: 0, wins: 0, kills: 0, deaths: 0 };
      mapStats[h.mapName].played++;
      if (h.mapWin) mapStats[h.mapName].wins++;
      mapStats[h.mapName].kills += h.kills;
      mapStats[h.mapName].deaths += h.deaths;
    });
    const mapPerformance = Object.entries(mapStats)
      .map(([name, s]) => ({
        name,
        played: s.played,
        winRate: Math.round((s.wins / s.played) * 100),
        kd: this.calculateKD(s.kills, s.deaths),
      }))
      .sort((a, b) => b.kd - a.kd);
    const splitStats = {};
    history.forEach((h) => {
      if (!splitStats[h.splitId])
        splitStats[h.splitId] = { kills: 0, deaths: 0, name: h.splitName };
      splitStats[h.splitId].kills += h.kills;
      splitStats[h.splitId].deaths += h.deaths;
    });
    const splitPerformance = Object.values(splitStats).map((s) => ({
      name: s.name,
      kd: this.calculateKD(s.kills, s.deaths),
    }));
    const tK = stats.reduce((a, s) => a + s.kills, 0);
    const tD = stats.reduce((a, s) => a + s.deaths, 0);
    const tW = stats.filter((s) => s.mapWin).length;
    let trend = { label: "Estável", value: 0, direction: "flat" };
    if (history.length >= 2) {
      const rev = [...history].reverse();
      const f3 = rev.slice(0, 3);
      const l3 = rev.slice(-3);
      const a1 = f3.reduce((a, c) => a + c.matchKD, 0) / f3.length;
      const a2 = l3.reduce((a, c) => a + c.matchKD, 0) / l3.length;
      const p = a1 === 0 ? 100 : ((a2 - a1) / a1) * 100;
      if (p > 5) trend = { label: "Evolução", value: p, direction: "up" };
      else if (p < -5)
        trend = { label: "Queda", value: Math.abs(p), direction: "down" };
    }
    return {
      player: {
        ...player,
        clanTag: clan?.tag,
        clanName: clan?.name,
        clanLogo: clan?.logoUrl,
      },
      titles,
      history,
      mapPerformance,
      splitPerformance,
      trend,
      stats: {
        totalMatches: history.length,
        totalKills: tK,
        totalDeaths: tD,
        totalKD: this.calculateKD(tK, tD),
        totalWins: tW,
        winRate: history.length ? Math.round((tW / history.length) * 100) : 0,
      },
    };
  }
}

// --- UI COMPONENTS ---
const Hero = ({ champion, settings }) => (
  <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden flex items-end justify-center bg-slate-900 border-b border-slate-800">
    {settings.heroBackgroundUrl ? (
      <img
        src={settings.heroBackgroundUrl}
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        alt="Banner Principal"
      />
    ) : (
      <div className="absolute inset-0 w-full h-full bg-slate-900 flex items-center justify-center z-0">
        <span className="text-slate-700 font-bold uppercase tracking-widest text-sm">
          Banner não configurado
        </span>
      </div>
    )}

    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div>

    <div className="relative z-20 pb-8 w-full flex flex-col items-center">
      {champion ? (
        <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-500 cursor-pointer animate-fadeIn mt-auto">
          <div className="relative group">
            <div className="absolute -inset-6 bg-amber-500/20 rounded-full blur-2xl transition-all duration-700"></div>
            {champion.type === "clan" ? (
              <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-2xl p-4 bg-slate-900/90 backdrop-blur-sm border-2 border-amber-400 shadow-2xl flex items-center justify-center">
                <img
                  src={champion.data.logoUrl}
                  alt={champion.data.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            ) : (
              <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-br from-amber-300 to-amber-600 shadow-2xl">
                <img
                  src={champion.data.avatarUrl}
                  alt={champion.data.nickname}
                  className="w-full h-full rounded-full object-cover border-4 border-slate-950"
                />
              </div>
            )}
            <div className="absolute -top-4 -right-4 text-amber-300 animate-bounce drop-shadow-lg">
              <Trophy size={32} fill="currentColor" />
            </div>
          </div>
          <div className="mt-4 text-center bg-slate-950/90 backdrop-blur-md px-6 py-2.5 rounded-xl border border-white/10 shadow-2xl">
            <span className="block text-amber-400 font-bold text-[9px] uppercase tracking-widest mb-0.5">
              Campeão Atual
            </span>
            <h2 className="text-lg md:text-xl font-black text-white uppercase flex items-center gap-2 justify-center tracking-tight">
              {champion.type === "clan" ? (
                champion.data.name
              ) : (
                <>
                  {champion.data.clanTag && (
                    <span className="text-amber-500 text-sm font-mono mr-1 opacity-80">
                      [{champion.data.clanTag}]
                    </span>
                  )}
                  {champion.type === "player" &&
                    checkCosmetics(champion.data).isPremium && (
                      <Crown size={20} className="text-amber-400 shrink-0" />
                    )}
                  <span
                    className={
                      champion.type === "player"
                        ? checkCosmetics(champion.data).nameClass
                        : ""
                    }
                  >
                    {champion.data.nickname}
                  </span>
                </>
              )}
            </h2>
          </div>
        </div>
      ) : (
        <div className="bg-slate-950/80 backdrop-blur-md px-8 py-3 rounded-xl border border-white/10 shadow-2xl animate-fadeIn mt-auto">
          <span className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <Trophy size={14} className="text-amber-400" /> Temporada em Aberto
          </span>
        </div>
      )}
    </div>
  </div>
);

const TeamsPage = ({ clans, players, sponsors, backend, onPlayerClick }) => {
  const [selectedClanId, setSelectedClanId] = useState(null);

  if (selectedClanId) {
    const clan = clans.find((c) => c.id === selectedClanId);
    if (!clan) return null;
    const clanPlayers = players.filter(
      (p) => p.clanId === clan.id && !p.isPaused
    );
    const clanTitles = backend.getClanTitles(clan.id);
    const clanHistory = backend.getClanHistory(clan.id);

    // Filtra os patrocinadores exclusivos deste clã
    const clanSponsors = sponsors
      ? sponsors.filter((s) => s.clanId === clan.id)
      : [];

    // NOVO: Puxa o extrato financeiro do banco de dados (Transparência)
    const clanLogs = backend.db.financialLogs
      ? backend.db.financialLogs
          .filter((l) => l.clanId === clan.id)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      : [];

    return (
      <div className="animate-fadeIn space-y-8">
        <button
          onClick={() => setSelectedClanId(null)}
          className="text-slate-500 hover:text-white flex items-center gap-2 text-xs font-bold uppercase transition-colors tracking-widest group bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800 hover:border-slate-600 w-fit"
        >
          <ChevronRight
            size={14}
            className="rotate-180 group-hover:-translate-x-1 transition-transform"
          />{" "}
          Voltar para a Liga
        </button>

        {/* BANNER DO CLÃ GIGANTE */}
        <div className="relative bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl mb-8">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/40 via-slate-900 to-slate-950 pointer-events-none"></div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 bg-slate-950 rounded-[2rem] p-8 border border-slate-700 shadow-2xl flex items-center justify-center relative group">
              <div className="absolute inset-0 border-2 border-amber-400/0 group-hover:border-amber-400/50 rounded-[2rem] transition-colors duration-500"></div>
              <img
                src={clan.logoUrl}
                alt={clan.tag}
                className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="flex-1 text-center md:text-left flex flex-col justify-center mt-2 md:mt-6">
              <div className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono font-bold px-4 py-1.5 rounded-lg text-xs mb-4 tracking-widest w-fit mx-auto md:mx-0 shadow-sm">
                TAG OFICIAL: [{clan.tag}]
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 drop-shadow-lg">
                {clan.name}
              </h2>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-inner">
                  <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <Banknote className="text-emerald-400" size={24} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-0.5">
                      Orçamento do Clã
                    </div>
                    <div className="text-emerald-400 font-mono font-black text-xl leading-none">
                      {formatCurrency(clan.budget)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SESSÃO DE MARCAS E TÍTULOS */}
        {(clanSponsors.length > 0 || clanTitles.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clanSponsors.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg">
                <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-6 border-b border-slate-800/80 pb-3">
                  <Handshake size={16} className="text-blue-400" />{" "}
                  Patrocinadores Oficiais
                </h4>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
                  {clanSponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className="flex flex-col items-center group relative min-w-[80px]"
                      title={`${sponsor.name} - ${
                        sponsor.type === "victory"
                          ? "Bônus por Vitória"
                          : "Cota Fixa"
                      }`}
                    >
                      <div className="w-16 h-16 bg-white rounded-2xl p-2 mb-3 flex items-center justify-center shadow-xl border-4 border-slate-950 transition-transform group-hover:-translate-y-2">
                        <img
                          src={sponsor.logoUrl}
                          className="max-w-full max-h-full object-contain"
                          alt={sponsor.name}
                        />
                      </div>
                      <div className="text-[10px] text-white font-bold text-center leading-tight truncate w-full px-1">
                        {sponsor.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {clanTitles.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg">
                <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-6 border-b border-slate-800/80 pb-3">
                  <Crown size={16} className="text-amber-400" /> Sala de Troféus
                </h4>
                <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
                  {clanTitles.map((title, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center group relative min-w-[80px]"
                      title={`${title.championshipName} - ${title.splitName}`}
                    >
                      <img
                        src={title.trophyUrl}
                        className="w-16 h-16 mb-3 object-contain drop-shadow-[0_10px_10px_rgba(251,191,36,0.3)] transition-transform group-hover:-translate-y-2 group-hover:scale-110"
                      />
                      <div className="text-[10px] text-white font-bold text-center leading-tight truncate w-full px-1">
                        {title.championshipName}
                      </div>
                      <div className="text-[8px] text-slate-500 font-mono mt-0.5">
                        {title.splitName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* LINE-UP */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8 md:p-10">
          <h4 className="text-white font-black uppercase text-lg mb-8 flex items-center gap-3 tracking-tight border-b border-slate-800 pb-4">
            <Users size={24} className="text-amber-400" /> Line-up Ativa
          </h4>
          <div className="flex flex-wrap gap-8 items-end justify-center md:justify-start">
            {clanPlayers.map((p) => (
              <div
                key={p.id}
                onClick={() => onPlayerClick(p.id)}
                className="group cursor-pointer flex flex-col items-center w-40 transition-all hover:-translate-y-3 relative"
              >
                <div className="w-36 h-48 overflow-hidden rounded-t-2xl bg-gradient-to-b from-slate-800 to-slate-950 relative border-b-4 border-amber-500 group-hover:border-amber-400 transition-colors shadow-2xl">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src={p.avatarUrl}
                    alt={p.nickname}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="bg-slate-950 w-full text-center py-4 rounded-b-2xl border border-slate-800 border-t-0 shadow-2xl relative z-20 flex flex-col items-center justify-center gap-1.5 group-hover:bg-slate-800 transition-colors">
                  <div
                    className={`text-base font-black truncate w-full px-2 transition-colors flex items-center justify-center gap-1.5 ${
                      checkCosmetics(p).nameClass
                    } ${
                      !checkCosmetics(p).isPremium &&
                      "group-hover:text-amber-400"
                    }`}
                  >
                    {checkCosmetics(p).isPremium && (
                      <Crown size={14} className="text-amber-400 shrink-0" />
                    )}
                    <span className="truncate">{p.nickname}</span>
                  </div>
                  {p.contractEnd && (
                    <div className="text-[9px] text-slate-500 font-mono uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      Venc: {new Date(p.contractEnd).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {clanPlayers.length === 0 && (
              <div className="text-slate-500 text-sm italic py-8 w-full text-center bg-slate-950 rounded-2xl border border-dashed border-slate-800">
                Nenhum jogador contratado no momento. Vá ao mercado!
              </div>
            )}
          </div>
        </div>

        {/* NOVA ÁREA DIVIDIDA: ARENA x ESCRITÓRIO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HISTÓRICO DE PARTIDAS (ESQUERDA) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8 md:p-10 flex flex-col max-h-[600px]">
            <h4 className="text-white font-black uppercase text-lg mb-8 flex items-center gap-3 tracking-tight border-b border-slate-800 pb-4 shrink-0">
              <HistoryIcon size={24} className="text-amber-400" /> Últimos
              Confrontos
            </h4>
            <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 flex-1">
              {clanHistory.map((match) => (
                <div
                  key={match.id}
                  className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-slate-600 transition-all shadow-md hover:shadow-lg group"
                >
                  <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
                    <div className="text-white font-black text-lg mb-1 tracking-tight group-hover:text-amber-400 transition-colors">
                      {match.mapName}{" "}
                      <span className="text-[10px] text-slate-500 font-bold ml-2 uppercase border border-slate-700 px-2 py-0.5 rounded align-middle">
                        ({match.md3GroupId})
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={12} /> {match.splitName}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 bg-slate-900 px-6 py-3 rounded-xl border border-slate-800 shadow-inner w-full md:w-auto justify-center">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono font-black text-2xl ${
                          match.isWin
                            ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]"
                            : "text-slate-500"
                        }`}
                      >
                        {match.myScore}
                      </span>
                    </div>
                    <span className="text-slate-700 font-black text-base">
                      VS
                    </span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono font-black text-2xl ${
                          !match.isWin
                            ? "text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]"
                            : "text-slate-500"
                        }`}
                      >
                        {match.enemyScore}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {clanHistory.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-sm italic border border-dashed border-slate-800 rounded-2xl">
                  A história ainda será escrita!
                </div>
              )}
            </div>
          </div>

          {/* NOVO: EXTRATO FINANCEIRO (DIREITA) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8 md:p-10 flex flex-col max-h-[600px]">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6 border-b border-slate-800 pb-6 shrink-0">
              <h4 className="text-white font-black uppercase text-lg flex items-center gap-3 tracking-tight">
                <FileText size={24} className="text-emerald-400" />{" "}
                Transparência
              </h4>
              <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-3 shadow-inner">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  Caixa Atual:
                </span>
                <span
                  className={`font-mono font-black text-xl leading-none ${
                    clan.budget < 0 ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {formatCurrency(clan.budget)}
                </span>
              </div>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 flex-1">
              {clanLogs.map((log) => {
                const isPositive = log.amount > 0;
                const isNeutral = log.amount === 0;
                return (
                  <div
                    key={log.id}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col xl:flex-row justify-between xl:items-center gap-4 hover:border-slate-700 transition-colors group"
                  >
                    <div>
                      <div className="text-white font-bold text-sm mb-1 group-hover:text-amber-100 transition-colors">
                        {log.reason}
                      </div>
                      <div className="text-slate-500 text-[10px] flex items-center gap-2">
                        <span>{new Date(log.date).toLocaleDateString()}</span>
                        <span className="uppercase font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-700 text-[8px] tracking-widest">
                          {log.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-left xl:text-right border-t border-slate-800/50 xl:border-none pt-3 xl:pt-0">
                      <div
                        className={`font-mono font-black text-lg ${
                          isPositive
                            ? "text-emerald-400"
                            : isNeutral
                            ? "text-slate-400"
                            : "text-red-400"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {formatCurrency(log.amount)}
                      </div>
                      <div className="text-slate-600 text-[10px] font-mono mt-0.5">
                        Caixa: {formatCurrency(log.newBalance)}
                      </div>
                    </div>
                  </div>
                );
              })}
              {clanLogs.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-sm italic border border-dashed border-slate-800 rounded-2xl">
                  Nenhuma movimentação financeira registrada.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn space-y-8 pb-12">
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-800 pb-6 mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight flex items-center justify-center md:justify-start gap-4">
            <Shield className="text-amber-400" size={36} /> Franquias Oficiais
          </h2>
          <p className="text-slate-500 text-sm mt-2 text-center md:text-left">
            As organizações de elite que disputam a supremacia na MVL.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {clans.map((clan) => (
          <div
            key={clan.id}
            onClick={() => setSelectedClanId(clan.id)}
            className="relative bg-slate-900 border border-slate-800 rounded-[2rem] p-6 flex flex-col items-center cursor-pointer hover:border-amber-500/40 transition-all duration-500 group shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden hover:-translate-y-2"
          >
            {/* Brilho de Fundo no Card */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-800/50 to-transparent z-0"></div>

            <div className="relative z-10 w-32 h-32 mb-8 mt-4 flex items-center justify-center">
              {/* Círculo escuro atrás da logo */}
              <div className="absolute inset-0 bg-slate-950 rounded-full shadow-inner transform group-hover:scale-90 transition-transform duration-500 border border-slate-800"></div>
              <img
                src={clan.logoUrl}
                alt={clan.tag}
                className="w-24 h-24 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-500 relative z-10"
              />
            </div>

            <div className="relative z-10 text-center w-full">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors line-clamp-1">
                {clan.name}
              </h3>
              <span className="text-amber-500 font-mono font-bold text-[10px] mt-2 inline-block bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg tracking-widest shadow-sm">
                [{clan.tag}]
              </span>
            </div>

            <div className="relative z-10 w-full border-t border-slate-800/80 mt-8 pt-5 flex justify-between items-center bg-slate-900">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <Users size={14} className="text-blue-400" />
                {
                  players.filter((p) => p.clanId === clan.id && !p.isPaused)
                    .length
                }{" "}
                Atletas
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono font-black tracking-wider">
                <Banknote size={14} />
                {formatCurrency(clan.budget)}
              </div>
            </div>
          </div>
        ))}
        {clans.length === 0 && (
          <div className="col-span-full text-center py-24 bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest border border-dashed border-slate-800 rounded-3xl shadow-inner">
            <Shield size={48} className="mx-auto mb-4 opacity-20" />
            Nenhuma equipe registrada no sistema.
          </div>
        )}
      </div>
    </div>
  );
};

const PlayersPage = ({ players, clans, backend, onPlayerClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getPlayerTier = (player) => {
    const profile = backend.getPlayerFullProfile(player.id);
    const kd = profile?.stats?.totalKD || 0;
    const matches = profile?.stats?.totalMatches || 0;

    if (matches < 3)
      return {
        id: "unranked",
        label: "Avaliação",
        color: "from-slate-600 to-slate-800",
        border: "border-slate-700",
        text: "text-slate-500",
        badge: "TBD",
      };
    if (kd >= 1.2 || player.marketValue >= 18000000)
      return {
        id: "gold",
        label: "Ouro",
        color: "from-yellow-300 to-amber-600",
        border: "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]",
        text: "text-yellow-400",
        badge: "GLD",
      };
    if (kd >= 0.9 || player.marketValue >= 12000000)
      return {
        id: "silver",
        label: "Prata",
        color: "from-slate-300 to-slate-500",
        border: "border-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.2)]",
        text: "text-slate-300",
        badge: "SLV",
      };

    return {
      id: "bronze",
      label: "Bronze",
      color: "from-orange-700 to-amber-900",
      border: "border-orange-700",
      text: "text-orange-500",
      badge: "BRZ",
    };
  };

  const filteredPlayers = players
    .filter((p) => p.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort(
      (a, b) =>
        (b.marketValue || 0) - (a.marketValue || 0) ||
        a.nickname.localeCompare(b.nickname)
    );

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <Users className="text-amber-400" size={28} /> Atletas da Liga
          </h2>
          <p className="text-slate-500 text-xs mt-1 font-medium">
            Cartinhas e Tiers baseados em K/D e Valor de Passe.
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={14}
          />
          <input
            type="text"
            placeholder="Buscar jogador..."
            className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-amber-400 w-full transition-colors font-bold shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredPlayers.map((p) => {
          const clan = clans.find((c) => c.id === p.clanId);
          const tier = getPlayerTier(p);
          const cosmetics = checkCosmetics(p);
          return (
            <div
              key={p.id}
              onClick={() => onPlayerClick(p.id)}
              className="group cursor-pointer flex flex-col items-center transition-transform hover:-translate-y-3 relative"
            >
              {/* O FOGO ANIMADO ATRÁS DO CARD INTEIRO */}
              <div className={cosmetics.fireCard}></div>

              <div
                className={`absolute -top-3 -right-3 z-30 w-9 h-9 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center border-2 border-slate-950 shadow-xl group-hover:scale-125 transition-transform`}
                title={`Tier ${tier.label}`}
              >
                <span className="text-[10px] font-black text-slate-950 uppercase tracking-tighter">
                  {tier.badge}
                </span>
              </div>
              <div
                className={`w-full aspect-[4/5] overflow-hidden rounded-t-xl bg-gradient-to-b from-slate-800 to-slate-950 relative border-b-4 ${tier.border} transition-all ${cosmetics.avatarRing}`}
              >
                <img
                  src={p.avatarUrl}
                  alt={p.nickname}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>

                {cosmetics.isPremium && (
                  <Crown className="absolute top-2 left-2 text-amber-400 w-6 h-6 drop-shadow-[0_2px_5px_rgba(251,191,36,0.8)] z-20 group-hover:rotate-12 transition-transform" />
                )}

                {p.isPaused && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg z-20">
                    <Ban size={10} />
                  </div>
                )}
                {clan && (
                  <img
                    src={clan.logoUrl}
                    className="absolute bottom-2 right-2 w-7 h-7 object-contain drop-shadow-md bg-slate-900/60 rounded p-1 backdrop-blur-sm border border-white/10 z-20"
                    alt={clan.tag}
                    title={clan.name}
                  />
                )}
              </div>
              <div className="bg-slate-900 w-full text-center py-3 rounded-b-xl border border-slate-800 border-t-0 shadow-xl relative z-20 flex flex-col items-center justify-center gap-1 group-hover:bg-slate-800 transition-colors">
                <div
                  className={`text-sm font-black truncate px-2 transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    cosmetics.nameClass
                  } ${
                    !cosmetics.isPremium &&
                    !cosmetics.hasNeon &&
                    "group-hover:text-amber-400"
                  } group-hover:scale-105`}
                >
                  {cosmetics.isPremium && (
                    <Crown size={12} className="text-amber-400 shrink-0" />
                  )}
                  <span className="truncate">{p.nickname}</span>
                </div>
                <div
                  className={`text-[9px] font-mono uppercase font-bold tracking-widest ${tier.text}`}
                >
                  {tier.label} <span className="text-slate-600 mx-1">•</span>{" "}
                  {clan ? clan.tag : "F/A"}
                </div>
              </div>
            </div>
          );
        })}
        {filteredPlayers.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-500 italic border border-dashed border-slate-800 rounded-2xl">
            Nenhum jogador encontrado.
          </div>
        )}
      </div>
    </div>
  );
};

const ClanStandingsTable = ({ data }) => (
  <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full ring-1 ring-white/5">
    <div className="bg-slate-900/50 p-5 border-b border-slate-800 flex justify-between items-center shrink-0 backdrop-blur-sm">
      <h3 className="text-lg font-black text-white uppercase flex items-center gap-3 tracking-tight">
        <div className="p-1.5 bg-slate-800 rounded-lg border border-slate-700">
          <Shield className="text-amber-400" size={18} />
        </div>{" "}
        Tabela de Classificação
      </h3>
    </div>
    <div className="overflow-x-auto grow scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-950/50 text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider sticky top-0 z-10 backdrop-blur-sm">
          <tr>
            <th className="p-4 border-b border-slate-800 text-center">Pos</th>
            <th className="p-4 border-b border-slate-800">Equipe</th>
            <th
              className="p-4 text-center border-b border-slate-800"
              title="Jogos"
            >
              J
            </th>
            <th
              className="p-4 text-center border-b border-slate-800"
              title="Vitórias"
            >
              V
            </th>
            <th
              className="p-4 text-center border-b border-slate-800"
              title="Derrotas"
            >
              D
            </th>
            <th
              className="p-4 text-center border-b border-slate-800"
              title="Saldo de Mapas"
            >
              SD
            </th>
            <th className="p-4 text-center text-amber-500 bg-amber-500/5 border-b border-amber-500/10">
              PTS
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {data.map((clan, index) => (
            <tr
              key={clan.id}
              className={`hover:bg-slate-800/60 transition-colors ${
                index === 0
                  ? "bg-gradient-to-r from-amber-500/10 to-transparent"
                  : ""
              }`}
            >
              <td
                className={`p-4 font-mono font-bold w-12 text-center ${
                  index === 0 ? "text-amber-400" : "text-slate-500"
                }`}
              >
                {index + 1}º
              </td>
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={clan.logoUrl}
                    className="w-8 h-8 object-contain drop-shadow"
                  />
                  <span className="font-bold text-sm text-white flex items-center gap-2">
                    {clan.name}{" "}
                    <span className="text-[10px] text-slate-500 font-mono tracking-widest hidden sm:inline-block">
                      [{clan.tag}]
                    </span>
                  </span>
                </div>
              </td>
              <td className="p-4 text-center font-mono text-slate-300 font-bold">
                {clan.matches}
              </td>
              <td className="p-4 text-center font-mono text-emerald-400 font-bold">
                {clan.wins}
              </td>
              <td className="p-4 text-center font-mono text-red-400 font-bold">
                {clan.losses}
              </td>
              <td className="p-4 text-center font-mono text-slate-300 font-bold">
                {clan.mapDiff > 0 ? `+${clan.mapDiff}` : clan.mapDiff}
              </td>
              <td className="p-4 text-center font-black text-xl text-white bg-slate-800/20">
                {clan.points}
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="p-12 text-center text-slate-500 text-sm italic"
              >
                Nenhum jogo na fase de grupos registrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const NewsSection = ({ news }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {news.map((item, idx) => (
      <div
        key={item.id}
        className={`group relative bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 cursor-default ${
          idx === 0 ? "md:col-span-2 md:flex" : ""
        }`}
      >
        <div
          className={`overflow-hidden relative ${
            idx === 0 ? "md:w-2/3 h-64 md:h-auto" : "h-48"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60"></div>
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
        </div>
        <div
          className={`p-6 flex flex-col justify-center relative z-20 ${
            idx === 0 ? "md:w-1/3 bg-slate-900 border-l border-slate-800" : ""
          }`}
        >
          <div className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <Calendar size={12} /> {item.date}
          </div>
          <h4
            className={`${
              idx === 0 ? "text-2xl" : "text-lg"
            } text-white font-bold mb-3 leading-tight group-hover:text-amber-400 transition-colors line-clamp-2`}
          >
            {item.title}
          </h4>
          <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed group-hover:text-slate-300 transition-colors">
            {item.content}
          </p>
        </div>
      </div>
    ))}
    {news.length === 0 && (
      <div className="col-span-2 text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl border-dashed text-slate-500 text-sm">
        <Newspaper size={32} className="mx-auto mb-3 opacity-20" />
        Nenhuma notícia publicada ainda.
      </div>
    )}
  </div>
);

const TitleRace = ({ ranking, onPlayerClick }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl ring-1 ring-white/5">
    <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
      <h3 className="text-lg font-black text-white uppercase flex items-center gap-2 tracking-tight">
        <Medal className="text-amber-400" size={20} /> Corrida pelo MVP
      </h3>
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    </div>
    <p className="text-slate-500 mb-6 text-xs leading-relaxed font-medium">
      Melhores estatísticas individuais do Split.
    </p>
    {ranking.length > 0 ? (
      <div className="space-y-2.5">
        {ranking.slice(0, 8).map((p, idx) => {
          const status =
            idx === 0 ? "Liderando" : idx < 4 ? "Na Disputa" : "Fora";
          const colorClass =
            idx === 0
              ? "text-amber-400 border-amber-400/20 bg-amber-400/5 shadow-[0_0_10px_rgba(251,191,36,0.1)]"
              : idx < 4
              ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5"
              : "text-slate-500 border-slate-800 bg-slate-900 opacity-60";
          return (
            <div
              key={p.playerId}
              onClick={() => onPlayerClick(p.playerId)}
              className={`flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-600 transition-all cursor-pointer group hover:bg-slate-800 ${
                p.isPaused ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono font-bold w-6 text-center text-sm ${
                    idx === 0 ? "text-amber-400" : "text-slate-600"
                  }`}
                >
                  #{idx + 1}
                </span>
                <div className="flex flex-col">
                  <span
                    className={`text-xs font-bold transition-colors flex items-center gap-1 ${
                      checkCosmetics(p).isPremium
                        ? checkCosmetics(p).nameClass
                        : idx === 0
                        ? "text-white group-hover:text-amber-400"
                        : "text-slate-300 group-hover:text-amber-400"
                    }`}
                  >
                    {p.clanTag && (
                      <span className="text-amber-500 text-[9px] font-mono tracking-tight">
                        [{p.clanTag}]
                      </span>
                    )}
                    {checkCosmetics(p).isPremium && (
                      <Crown size={10} className="text-amber-400 shrink-0" />
                    )}
                    <span className="truncate">{p.nickname}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Pts:{" "}
                    <span className="text-slate-300 font-bold">{p.points}</span>
                  </span>
                </div>
              </div>
              <div
                className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${colorClass}`}
              >
                {status}
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="text-slate-500 italic text-sm text-center py-6 border border-dashed border-slate-800 rounded-lg">
        Dados insuficientes.
      </div>
    )}
  </div>
);

const MatchDetailsModal = ({ matchId, data, onClose, highlightPlayerId }) => {
  const match = data.matches.find((m) => m.id === matchId);
  if (!match) return null;
  const split = data.splits.find((s) => s.id === match.splitId);
  const stats = data.stats
    .filter((s) => s.matchId === matchId)
    .map((s) => {
      const p = data.players.find((pl) => pl.id === s.playerId);
      const clan = data.clans.find((c) => c.id === p?.clanId);
      return {
        ...s,
        nickname: p?.nickname || "Unknown",
        avatarUrl: p?.avatarUrl,
        clanTag: clan?.tag,
        kd: s.deaths === 0 ? s.kills : Number((s.kills / s.deaths).toFixed(2)),
        inventory: p?.inventory,
      };
    });
  const mvp = [...stats].sort((a, b) => b.kills - a.kills || b.kd - a.kd)[0]
    ?.playerId;
  const teamA =
    match.winnerSide === "A"
      ? stats.filter((s) => s.mapWin)
      : match.winnerSide === "B"
      ? stats.filter((s) => !s.mapWin)
      : stats.slice(0, 5);
  const teamB =
    match.winnerSide === "B"
      ? stats.filter((s) => s.mapWin)
      : match.winnerSide === "A"
      ? stats.filter((s) => !s.mapWin)
      : stats.slice(5);
  const renderTable = (ts, tName, isW) => (
    <div
      className={`flex-1 bg-slate-900 rounded-xl overflow-hidden border ${
        isW ? "border-amber-400/30" : "border-slate-800"
      }`}
    >
      <div
        className={`p-3 text-center font-bold uppercase text-xs tracking-wider ${
          isW ? "bg-amber-400/90 text-black" : "bg-slate-800/80 text-slate-400"
        }`}
      >
        {tName} {isW && <Crown size={14} />}
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-950/50 text-[10px] text-slate-500 uppercase border-b border-slate-800">
          <tr>
            <th className="p-3">Jogador</th>
            <th className="p-3 text-center">K</th>
            <th className="p-3 text-center">D</th>
            <th className="p-3 text-center">KD</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {ts.map((p) => (
            <tr
              key={p.id}
              className={`${
                highlightPlayerId === p.playerId ? "bg-amber-500/5" : ""
              } ${
                !highlightPlayerId && p.playerId === mvp ? "bg-amber-400/5" : ""
              }`}
            >
              <td className="p-3 flex items-center gap-3">
                <img
                  src={p.avatarUrl}
                  className="w-8 h-8 rounded-lg bg-slate-800"
                />
                <div className="flex flex-col">
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${
                      checkCosmetics(p).isPremium
                        ? checkCosmetics(p).nameClass
                        : highlightPlayerId === p.playerId
                        ? "text-white"
                        : p.playerId === mvp
                        ? "text-amber-300"
                        : "text-slate-300"
                    }`}
                  >
                    {p.clanTag && (
                      <span className="text-amber-500 font-mono text-[10px]">
                        [{p.clanTag}]
                      </span>
                    )}
                    {checkCosmetics(p).isPremium && (
                      <Crown size={10} className="text-amber-400 shrink-0" />
                    )}
                    <span className="truncate">{p.nickname}</span>
                  </span>
                </div>
              </td>
              <td className="p-3 text-center font-bold text-sm text-slate-300">
                {p.kills}
              </td>
              <td className="p-3 text-center text-slate-500 text-sm">
                {p.deaths}
              </td>
              <td
                className={`p-3 text-center font-mono text-xs font-bold ${
                  p.kd >= 1 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {p.kd.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white p-2 bg-slate-800/50 rounded-full hover:bg-slate-700 transition-colors z-10"
        >
          <X size={20} />
        </button>
        <div className="p-8 pb-4 text-center border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-900/50">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
              {split?.name}
            </span>
            <span className="text-xs font-bold uppercase text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
              {match.md3GroupId}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-8">
            {match.mapName}
          </h2>
          <div className="flex items-center justify-center gap-8 md:gap-20">
            <div
              className={`flex flex-col items-center ${
                match.winnerSide === "A" ? "scale-110" : "opacity-50 blur-[1px]"
              }`}
            >
              <span className="text-blue-400 font-bold uppercase text-xs mb-2">
                Time Blue{" "}
                {match.clanA_Id
                  ? `[${data.clans.find((c) => c.id === match.clanA_Id)?.tag}]`
                  : ""}
              </span>
              <span
                className={`text-6xl md:text-8xl font-mono font-black ${
                  match.winnerSide === "A" ? "text-blue-400" : "text-white"
                }`}
              >
                {match.scoreA || 0}
              </span>
            </div>
            <span className="text-slate-700 font-black text-2xl">VS</span>
            <div
              className={`flex flex-col items-center ${
                match.winnerSide === "B" ? "scale-110" : "opacity-50 blur-[1px]"
              }`}
            >
              <span className="text-red-400 font-bold uppercase text-xs mb-2">
                Time Red{" "}
                {match.clanB_Id
                  ? `[${data.clans.find((c) => c.id === match.clanB_Id)?.tag}]`
                  : ""}
              </span>
              <span
                className={`text-6xl md:text-8xl font-mono font-black ${
                  match.winnerSide === "B" ? "text-red-400" : "text-white"
                }`}
              >
                {match.scoreB || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {renderTable(teamA, "Time Blue", match.winnerSide === "A")}
            {renderTable(teamB, "Time Red", match.winnerSide === "B")}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerProfile = ({ profileData, data, onBack }) => {
  if (!profileData)
    return (
      <div className="text-white text-center p-8">Jogador não encontrado.</div>
    );
  const {
    player,
    titles,
    history,
    mapPerformance,
    splitPerformance,
    trend,
    stats,
  } = profileData;
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const contractStatus = getContractStatus(player);
  const penaltyValue = calculateReleaseClause(
    player.marketValue || 10000000,
    player.releaseClauseMultiplier
  );
  const cosmetics = checkCosmetics(player);

  return (
    <div className="animate-fadeIn pb-12">
      <button
        onClick={onBack}
        className="mb-8 text-slate-500 hover:text-white flex items-center gap-2 text-xs font-bold uppercase transition-colors tracking-widest"
      >
        <ChevronRight size={14} className="rotate-180" /> Voltar
      </button>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        {player.isPaused && (
          <div className="absolute top-6 right-6 bg-red-500/10 border border-red-500/20 text-red-500 px-3 py-1.5 rounded-full font-bold uppercase text-[10px] z-20 flex items-center gap-2">
            <Ban size={12} /> Suspenso
          </div>
        )}
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="relative group cursor-default">
            {/* O FOGO ANIMADO ATRÁS DA FOTO */}
            <div className={cosmetics.fireProfile}></div>

            {/* Coroa flutuante se for Premium com animação extra */}
            {cosmetics.isPremium && (
              <Crown className="absolute -top-6 -left-6 text-amber-400 w-12 h-12 -rotate-12 drop-shadow-[0_5px_15px_rgba(251,191,36,0.8)] z-20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
            )}
            <img
              src={player.avatarUrl}
              className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-2xl object-cover transition-all duration-500 relative z-10 ${
                cosmetics.avatarRing
              } ${player.isPaused ? "grayscale" : ""}`}
            />
          </div>
          <div className="text-center md:text-left flex-1 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-6">
              <div>
                <h2
                  className={`text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3 flex flex-wrap items-center justify-center md:justify-start gap-4 ${cosmetics.nameClass}`}
                >
                  {cosmetics.isPremium && (
                    <Crown size={32} className="text-amber-400 shrink-0" />
                  )}
                  {player.nickname}
                  {player.clanLogo && (
                    <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                      <img
                        src={player.clanLogo}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-sm text-slate-300 font-black uppercase tracking-widest">
                        {player.clanTag}
                      </span>
                    </div>
                  )}
                </h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="inline-block bg-slate-950 text-slate-400 px-4 py-1.5 rounded-lg text-xs font-mono border border-slate-800 tracking-wide">
                    {player.gameId}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 px-4 py-1.5 rounded-lg text-xs font-mono font-bold border border-green-500/20 tracking-wide shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                    <DollarSign size={14} /> Passe:{" "}
                    {formatCurrency(player.marketValue || 10000000)}
                  </span>
                </div>

                {/* BLOCO DO PATRIMÔNIO */}
                {/* INVENTÁRIO DO JOGADOR (A MOCHILA) */}
                {player.inventory && player.inventory.length > 0 && (
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/5 mb-8 text-left w-full md:max-w-sm mt-4">
                    <div className="flex items-center gap-2 text-blue-400 mb-3 border-b border-slate-800/80 pb-2">
                      <Package size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Mochila / Inventário
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {player.inventory.map((item, idx) => (
                        <div
                          key={idx}
                          className="relative group cursor-help"
                          title={item.name}
                        >
                          <div
                            className={`w-12 h-12 rounded-xl p-1.5 flex items-center justify-center border shadow-inner ${
                              item.isPremium
                                ? "bg-gradient-to-br from-amber-500/20 to-amber-700/20 border-amber-500/50"
                                : "bg-slate-900 border-slate-700"
                            }`}
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/5 mb-8 text-left max-w-sm mx-auto md:mx-0">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <TrendingUp size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      💰 Patrimônio de Carreira
                    </span>
                  </div>
                  <div className="text-xl font-mono font-black text-white">
                    {formatCurrency(player?.totalEarnings || 0)}
                  </div>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase">
                    Soma de todos os salários recebidos na liga
                  </p>
                </div>
              </div>
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 w-full md:w-auto min-w-[240px]">
                <h4 className="text-amber-500 text-[10px] font-bold uppercase mb-4 flex items-center gap-2 pb-2 border-b border-slate-800/50 tracking-widest">
                  <Crown size={14} /> Galeria de Títulos
                </h4>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
                  {titles.map((title, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center group relative min-w-[70px]"
                    >
                      <img
                        src={title.trophyUrl}
                        className="w-12 h-12 mb-3 object-contain drop-shadow-lg"
                      />
                      <div className="text-[10px] text-white font-bold text-center leading-tight mb-0.5">
                        {title.championshipName}
                      </div>
                      <div className="text-[9px] text-slate-600 font-mono">
                        {title.splitName}
                      </div>
                    </div>
                  ))}
                  {titles.length === 0 && (
                    <div className="text-slate-600 text-[10px] italic py-3 w-full text-center">
                      Nenhum título conquistado.
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[9px] font-bold uppercase mb-1 tracking-wider">
                  KD Geral
                </div>
                <div
                  className={`text-2xl font-mono font-bold ${
                    stats.totalKD >= 1 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {stats.totalKD.toFixed(2)}
                </div>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[9px] font-bold uppercase mb-1 tracking-wider">
                  Total Kills
                </div>
                <div className="text-2xl font-mono font-bold text-white">
                  {stats.totalKills}
                </div>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[9px] font-bold uppercase mb-1 tracking-wider">
                  Total Deaths
                </div>
                <div className={`text-2xl font-mono font-bold text-red-400`}>
                  {stats.totalDeaths}
                </div>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[9px] font-bold uppercase mb-1 tracking-wider">
                  Map Wins
                </div>
                <div className="text-2xl font-mono font-bold text-amber-400">
                  {stats.totalWins}{" "}
                  <span className="text-xs text-slate-500 font-sans opacity-70">
                    ({stats.winRate}%)
                  </span>
                </div>
              </div>
              <div
                className={`bg-slate-950/50 p-4 rounded-xl border flex flex-col justify-center transition-colors ${
                  trend.direction === "up"
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : trend.direction === "down"
                    ? "border-red-500/20 bg-red-500/5"
                    : "border-slate-800"
                }`}
              >
                <div className="text-slate-500 text-[9px] font-bold uppercase mb-1 flex items-center gap-1 tracking-wider">
                  Tendência <Activity size={10} />
                </div>
                <div
                  className={`text-sm font-bold flex items-center gap-2 ${
                    trend.direction === "up"
                      ? "text-emerald-400"
                      : trend.direction === "down"
                      ? "text-red-400"
                      : "text-slate-400"
                  }`}
                >
                  {trend.direction === "up" && <ArrowUpRight size={18} />}
                  {trend.direction === "down" && <ArrowDownRight size={18} />}
                  {trend.direction === "flat" && <Minus size={18} />}
                  {trend.value > 0 ? `${trend.value.toFixed(1)}%` : trend.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl border ${
                  contractStatus.isValid
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                    : "bg-slate-800 border-slate-700 text-slate-500"
                }`}
              >
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-white font-black uppercase tracking-tight flex items-center gap-2">
                  Situação Contratual{" "}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      contractStatus.isValid
                        ? contractStatus.isExpiring
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400"
                    }`}
                  >
                    {contractStatus.status}
                  </span>
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  {player.clanId
                    ? `Vinculado a: ${player.clanName}`
                    : "Agente Livre no Mercado"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-8 bg-slate-950 p-4 rounded-xl border border-slate-800 w-full md:w-auto">
              <div>
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">
                  Vencimento
                </div>
                <div className={`font-mono font-bold ${contractStatus.color}`}>
                  {player.contractEnd
                    ? new Date(player.contractEnd).toLocaleDateString()
                    : "--/--/----"}
                </div>
              </div>
              <div className="w-px h-8 bg-slate-800 hidden md:block"></div>
              <div>
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                  <Lock size={10} /> Multa Rescisória
                </div>
                <div
                  className={`font-mono font-bold ${
                    contractStatus.isValid && penaltyValue > 0
                      ? "text-red-400"
                      : "text-slate-500"
                  }`}
                >
                  {contractStatus.isValid && penaltyValue > 0
                    ? `+ ${formatCurrency(penaltyValue)}`
                    : "Isento"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-white font-black uppercase text-xs mb-6 flex items-center gap-2 tracking-widest border-b border-slate-800 pb-3">
              <MapIcon size={14} className="text-amber-400" /> Desempenho por
              Mapa
            </h3>
            <div className="space-y-5">
              {mapPerformance.map((map) => (
                <div key={map.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-300">{map.name}</span>
                    <span
                      className={`font-mono ${
                        map.kd >= 1 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {map.kd.toFixed(2)} KD
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                      style={{ width: `${Math.min(map.winRate, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500 font-medium">
                    <span>{map.played} jogos</span>
                    <span>{map.winRate}% Winrate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-white font-black uppercase text-xs mb-6 flex items-center gap-2 tracking-widest border-b border-slate-800 pb-3">
              <Calendar size={14} className="text-amber-400" /> Histórico por
              Split
            </h3>
            <div className="space-y-3">
              {splitPerformance.map((split) => (
                <div
                  key={split.name}
                  className="flex justify-between items-center p-3 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-300">
                    {split.name}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      split.kd >= 1 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {split.kd.toFixed(2)} KD
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-white font-black uppercase text-xs mb-6 flex items-center gap-2 tracking-widest border-b border-slate-800 pb-3">
              <Swords size={14} className="text-amber-400" /> Histórico de
              Partidas
            </h3>
            <div className="space-y-3">
              {history.map((match) => (
                <div
                  key={match.id}
                  onClick={() => setSelectedMatchId(match.matchId)}
                  className="grid grid-cols-12 gap-4 items-center p-4 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-amber-500/30 hover:bg-slate-900 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="col-span-3 text-xs text-slate-500">
                    <div className="font-bold text-slate-300 group-hover:text-amber-400 transition-colors">
                      {match.splitName}
                    </div>
                    <div className="text-[10px] opacity-70 mt-0.5">
                      {new Date(match.matchDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="text-xs font-bold text-white group-hover:text-amber-100 transition-colors uppercase tracking-tight">
                      {match.mapName}
                    </div>
                    <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">
                      {match.md3GroupId}
                    </div>
                  </div>
                  <div className="col-span-3 flex flex-col items-center">
                    <span
                      className={`text-sm font-mono font-bold ${
                        match.matchKD >= 1 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {match.matchKD.toFixed(2)} KD
                    </span>
                    <span className="text-[10px] font-bold text-white mt-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {match.kills}K{" "}
                      <span className="text-slate-600 mx-0.5">/</span>{" "}
                      {match.deaths}D
                    </span>
                  </div>
                  <div className="col-span-3 text-right">
                    {match.mapWin ? (
                      <span className="inline-block px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase rounded border border-emerald-500/20 tracking-wider mb-1">
                        Vitória
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 bg-red-500/10 text-red-500 text-[9px] font-black uppercase rounded border border-red-500/20 tracking-wider mb-1">
                        Derrota
                      </span>
                    )}
                    {match.scoreA !== undefined &&
                      match.scoreB !== undefined && (
                        <div className="text-[10px] font-mono mt-0.5 text-slate-400">
                          {match.winnerSide === "A" ? (
                            <span className="text-emerald-400 font-bold">
                              {match.scoreA}
                            </span>
                          ) : (
                            <span>{match.scoreA}</span>
                          )}
                          <span className="mx-1 text-slate-600">-</span>
                          {match.winnerSide === "B" ? (
                            <span className="text-emerald-400 font-bold">
                              {match.scoreB}
                            </span>
                          ) : (
                            <span>{match.scoreB}</span>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-center text-slate-500 text-sm py-12 border border-dashed border-slate-800 rounded-xl">
                  Nenhuma partida registrada.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedMatchId && (
        <MatchDetailsModal
          matchId={selectedMatchId}
          data={data}
          onClose={() => setSelectedMatchId(null)}
          highlightPlayerId={player.id}
        />
      )}
    </div>
  );
};

const StorePage = ({ items, players }) => {
  const [filter, setFilter] = useState("all");

  const filteredItems = items.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <div className="animate-fadeIn space-y-8 pb-12">
      <div className="relative bg-slate-900 rounded-3xl p-10 border border-slate-800 overflow-hidden shadow-2xl mb-8">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-4">
              <ShoppingCart className="text-blue-400" size={40} /> Mercado VIP
            </h2>
            <p className="text-slate-400 text-lg max-w-xl">
              Use o seu salário acumulado para adquirir vantagens no jogo,
              cosméticos para o seu perfil e itens exclusivos. Fale com o Admin
              para comprar.
            </p>
          </div>
        </div>
      </div>

      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 w-fit overflow-x-auto max-w-full scrollbar-hide mb-8">
        {[
          { id: "all", label: "Todos os Itens" },
          { id: "ingame", label: "Itens do Jogo" },
          { id: "cosmetic", label: "Cosméticos de Perfil" },
          { id: "premium", label: "Premium" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`shrink-0 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              filter === tab.id
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20 scale-105"
                : "text-slate-500 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-slate-900 border rounded-2xl overflow-hidden group flex flex-col transition-all duration-500 ease-out hover:-translate-y-3 cursor-pointer relative ${
              item.isPremium
                ? "border-amber-500/40 hover:border-amber-400 hover:shadow-[0_20px_60px_-10px_rgba(251,191,36,0.6)] shadow-[0_0_20px_rgba(251,191,36,0.1)]"
                : "border-slate-800 hover:border-blue-400/60 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.3)]"
            }`}
          >
            {/* Brilho interno do card premium */}
            {item.isPremium && (
              <div className="absolute inset-0 bg-gradient-to-b from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30"></div>
            )}

            <div
              className={`h-56 p-4 flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
                item.isPremium
                  ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-slate-900 to-slate-950 group-hover:from-amber-400/40"
                  : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-slate-900 to-slate-950 group-hover:from-blue-500/30"
              }`}
            >
              {/* Marca d'água de Coroa no fundo APENAS para Premium */}
              {item.isPremium && (
                <Crown className="absolute text-amber-500/10 w-48 h-48 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000 z-0 pointer-events-none" />
              )}

              <img
                src={item.imageUrl}
                className={`h-4/5 w-full object-contain relative z-10 ease-out transition-all duration-500 ${
                  item.isPremium
                    ? "drop-shadow-[0_15px_25px_rgba(251,191,36,0.3)] group-hover:drop-shadow-[0_25px_40px_rgba(251,191,36,0.6)] group-hover:scale-[1.35] group-hover:-rotate-12"
                    : "drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] group-hover:scale-[1.25] group-hover:-rotate-6"
                }`}
                alt={item.name}
              />

              {/* Sombra de chão virtual dinâmica com cor específica */}
              <div
                className={`absolute bottom-6 w-3/4 h-4 blur-xl rounded-full z-0 transition-all duration-500 group-hover:scale-75 group-hover:opacity-40 ${
                  item.isPremium ? "bg-amber-700/60" : "bg-black/50"
                }`}
              ></div>

              {item.stock > 0 && item.stock <= 5 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-lg animate-pulse shadow-lg z-20 border border-red-400">
                  Restam {item.stock}
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1 border-t border-slate-800 relative z-20 bg-slate-900">
              <div className="flex justify-between items-start mb-2">
                <h4
                  className={`font-bold text-lg leading-tight transition-colors ${
                    item.isPremium
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 group-hover:from-white group-hover:to-amber-300"
                      : "text-white group-hover:text-blue-400"
                  }`}
                >
                  {item.name}
                </h4>
              </div>
              <span
                className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded w-fit mb-4 ${
                  item.category === "premium"
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_10px_rgba(251,191,36,0.2)]"
                    : item.category === "ingame"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                }`}
              >
                {item.category === "premium"
                  ? "Item Premium"
                  : item.category === "ingame"
                  ? "Item do Jogo"
                  : "Cosmético"}
              </span>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="text-slate-500 text-[10px] uppercase font-bold">
                  Preço
                </div>
                {item.isPremium ? (
                  <div className="text-amber-400 font-black text-sm flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 shadow-inner">
                    <Crown size={14} className="animate-pulse" /> Premium
                  </div>
                ) : (
                  <div className="text-emerald-400 font-mono font-black text-lg">
                    {formatCurrency(item.price)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-2xl">
            Nenhum item disponível nesta categoria.
          </div>
        )}
      </div>
    </div>
  );
};

const MatchHistorySection = ({ data }) => {
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [viewMode, setViewMode] = useState("series");
  const sortedMatches = [...data.matches].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const backend = new BackendController(data);
  const processedSeries = (data.series || [])
    .map((s) => backend.getSeriesStatus(s))
    .reverse();
  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-black text-white uppercase flex items-center gap-3 tracking-tight">
          <HistoryIcon className="text-amber-400" size={28} /> Histórico de
          Partidas
        </h2>
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode("series")}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              viewMode === "series"
                ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20 scale-105"
                : "text-slate-500 hover:text-white hover:bg-white/5"
            }`}
          >
            Séries (MD3)
          </button>
          <button
            onClick={() => setViewMode("matches")}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              viewMode === "matches"
                ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20 scale-105"
                : "text-slate-500 hover:text-white hover:bg-white/5"
            }`}
          >
            Todas as Partidas
          </button>
        </div>
      </div>
      {viewMode === "series" && (
        <div className="space-y-6 animate-fadeIn">
          {processedSeries.length > 0 ? (
            processedSeries.map((s) => (
              <div
                key={s.id}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
              >
                <div className="bg-slate-900/80 p-4 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                    <Layers size={12} className="text-amber-500" /> {s.label}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${
                      s.status === "Finalizada"
                        ? "bg-slate-800 border-slate-700 text-slate-400"
                        : "bg-green-500/10 border-green-500/20 text-green-400"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-b from-slate-900/30 to-transparent">
                  <div
                    className={`flex-1 text-center md:text-right transition-all duration-500 ${
                      s.finalWinner === "A"
                        ? "opacity-100 translate-x-0"
                        : "opacity-40"
                    }`}
                  >
                    <h3
                      className={`text-3xl font-black uppercase tracking-tight ${
                        s.finalWinner === "A" ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {s.teamA}
                    </h3>
                    {s.finalWinner === "A" && (
                      <span className="inline-block mt-2 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-400/20 px-2 py-0.5 rounded bg-blue-400/5">
                        Vencedor
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center shrink-0">
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-slate-400 text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-slate-700">
                        Placar
                      </div>
                      <span className="text-5xl font-mono font-black text-white leading-none tracking-tighter flex items-center gap-4">
                        <span
                          className={
                            s.finalWinner === "A"
                              ? "text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                              : "text-slate-500"
                          }
                        >
                          {s.winsA}
                        </span>
                        <span className="w-px h-10 bg-slate-800"></span>
                        <span
                          className={
                            s.finalWinner === "B"
                              ? "text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                              : "text-slate-500"
                          }
                        >
                          {s.winsB}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex-1 text-center md:text-left transition-all duration-500 ${
                      s.finalWinner === "B"
                        ? "opacity-100 translate-x-0"
                        : "opacity-40"
                    }`}
                  >
                    <h3
                      className={`text-3xl font-black uppercase tracking-tight ${
                        s.finalWinner === "B" ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {s.teamB}
                    </h3>
                    {s.finalWinner === "B" && (
                      <span className="inline-block mt-2 text-red-400 text-[10px] font-bold uppercase tracking-widest border border-red-400/20 px-2 py-0.5 rounded bg-red-400/5">
                        Vencedor
                      </span>
                    )}
                  </div>
                </div>
                {s.matches.length > 0 && (
                  <div className="bg-slate-950/30 p-4 border-t border-slate-800">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center">
                      {s.matches.map((m, i) => (
                        <div
                          key={m.id}
                          onClick={() => setSelectedMatchId(m.id)}
                          className="shrink-0 w-32 bg-slate-900 border border-slate-800 rounded-lg p-3 text-center cursor-pointer hover:border-amber-400/50 hover:bg-slate-800 transition-all duration-200 group"
                        >
                          <div className="text-[9px] text-slate-500 uppercase font-bold mb-1 tracking-wider group-hover:text-amber-400">
                            Mapa {i + 1}
                          </div>
                          <div className="text-xs font-bold text-white mb-2 truncate group-hover:text-amber-100">
                            {m.mapName}
                          </div>
                          <div className="text-[10px] font-mono bg-slate-950 rounded py-1 border border-slate-800">
                            <span
                              className={
                                m.winnerSide === "A"
                                  ? "text-blue-400 font-bold"
                                  : "text-slate-600"
                              }
                            >
                              {m.scoreA}
                            </span>
                            <span className="mx-1 text-slate-700">:</span>
                            <span
                              className={
                                m.winnerSide === "B"
                                  ? "text-red-400 font-bold"
                                  : "text-slate-600"
                              }
                            >
                              {m.scoreB}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed text-slate-500">
              <Layers size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-sm">Nenhuma série registrada.</p>
            </div>
          )}
        </div>
      )}
      {viewMode === "matches" &&
        (sortedMatches.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {sortedMatches.map((match) => {
              const split = data.splits.find((s) => s.id === match.splitId);
              const winnerText =
                match.winnerSide === "A"
                  ? "Vitória Blue"
                  : match.winnerSide === "B"
                  ? "Vitória Red"
                  : "Empate/Indefinido";
              const winnerColor =
                match.winnerSide === "A"
                  ? "text-blue-400"
                  : match.winnerSide === "B"
                  ? "text-red-400"
                  : "text-slate-400";
              const winnerBorder =
                match.winnerSide === "A"
                  ? "border-l-blue-500"
                  : match.winnerSide === "B"
                  ? "border-l-red-500"
                  : "border-l-slate-700";
              return (
                <div
                  key={match.id}
                  onClick={() => setSelectedMatchId(match.id)}
                  className={`bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between cursor-pointer hover:bg-slate-800 transition-all group shadow-sm hover:shadow-lg ${winnerBorder} border-l-[6px] hover:translate-x-1`}
                >
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="hidden md:flex flex-col items-center justify-center w-14 h-14 bg-slate-950 rounded-lg border border-slate-800/50 group-hover:border-slate-700 transition-colors">
                      <Swords
                        size={20}
                        className="text-slate-600 group-hover:text-white transition-colors"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-white font-black text-lg uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                          {match.mapName}
                        </span>
                        <span className="text-[10px] font-bold bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800 uppercase tracking-wide">
                          {match.md3GroupId}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex flex-col sm:flex-row gap-1 sm:gap-4 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />{" "}
                          {new Date(match.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Trophy size={12} className="text-amber-500/50" />{" "}
                          {split?.name || "Split Arquivado"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end bg-slate-950/50 md:bg-transparent p-3 md:p-0 rounded-lg">
                    <div className="text-right">
                      <div className="text-2xl font-mono font-black text-white leading-none flex items-center gap-3 justify-end">
                        <span
                          className={
                            match.winnerSide === "A"
                              ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                              : "text-slate-600"
                          }
                        >
                          {match.scoreA || 0}
                        </span>
                        <span className="text-slate-800 text-lg">:</span>
                        <span
                          className={
                            match.winnerSide === "B"
                              ? "text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                              : "text-slate-600"
                          }
                        >
                          {match.scoreB || 0}
                        </span>
                      </div>
                      <div
                        className={`text-[9px] font-bold uppercase mt-1 tracking-widest ${winnerColor}`}
                      >
                        {winnerText}
                      </div>
                    </div>
                    <ChevronRight className="text-slate-700 group-hover:text-amber-400 transition-colors hidden md:block" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed text-slate-500">
            <Swords size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-sm">Nenhuma partida registrada no histórico.</p>
          </div>
        ))}
      {selectedMatchId && (
        <MatchDetailsModal
          matchId={selectedMatchId}
          data={data}
          onClose={() => setSelectedMatchId(null)}
        />
      )}
    </div>
  );
};

const PointsDetailsModal = ({ player, onClose }) => {
  if (!player || !player.pointsBreakdown) return null;
  const bd = player.pointsBreakdown;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl relative overflow-hidden">
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-white font-bold uppercase flex items-center gap-2 text-sm">
            <Target className="text-amber-500" size={16} /> Relatório de
            Pontuação
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800 border-dashed">
            <img
              src={player.avatarUrl}
              className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700"
              alt={player.nickname}
            />
            <div>
              <h4 className="text-white font-black text-xl uppercase tracking-tight">
                {player.nickname}
              </h4>
              <span className="text-amber-500 text-[10px] uppercase font-bold tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Total: {player.points} PTS
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded-lg border border-slate-800">
              <div className="text-slate-300 text-xs font-bold uppercase flex items-center gap-2">
                <Target size={14} className="text-slate-500" /> Kills (1
                pt/kill)
              </div>
              <div className="text-emerald-400 font-mono font-bold">
                +{bd.kills} pts
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded-lg border border-slate-800">
              <div className="text-slate-300 text-xs font-bold uppercase flex items-center gap-2">
                <MapIcon size={14} className="text-slate-500" /> Map Wins (1
                pt/win)
              </div>
              <div className="text-emerald-400 font-mono font-bold">
                +{bd.mapWins} pts
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded-lg border border-slate-800">
              <div className="text-slate-300 text-xs font-bold uppercase flex items-center gap-2">
                <Trophy size={14} className="text-slate-500" /> MD3 Wins (3
                pts/win)
              </div>
              <div className="text-emerald-400 font-mono font-bold">
                +{bd.md3Wins} pts
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded-lg border border-slate-800">
              <div className="text-slate-300 text-xs font-bold uppercase flex items-center gap-2">
                <Activity size={14} className="text-slate-500" /> Bônus KD
                Positivo (1 pt/jogo)
              </div>
              <div className="text-emerald-400 font-mono font-bold">
                +{bd.kdBonus} pts
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RankingTable = ({ data, title, isGlobal = false, onPlayerClick }) => {
  const [selectedBreakdown, setSelectedBreakdown] = useState(null);
  return (
    <>
      <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full ring-1 ring-white/5">
        <div className="bg-slate-900/50 p-5 border-b border-slate-800 flex justify-between items-center shrink-0 backdrop-blur-sm">
          <h3 className="text-lg font-black text-white uppercase flex items-center gap-3 tracking-tight">
            <div className="p-1.5 bg-slate-800 rounded-lg border border-slate-700">
              {isGlobal ? (
                <TrendingUp className="text-amber-400" size={18} />
              ) : (
                <Swords className="text-amber-400" size={18} />
              )}
            </div>
            {title}
          </h3>
          {isGlobal && (
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800/50">
              Histórico Completo
            </span>
          )}
        </div>
        <div className="overflow-x-auto grow scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-950/50 text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="p-4 font-bold border-b border-slate-800">Pos</th>
                <th className="p-4 font-bold border-b border-slate-800">
                  Player
                </th>
                <th className="p-4 text-center text-amber-500 bg-amber-500/5 border-b border-amber-500/10">
                  PTS
                </th>
                <th className="p-4 text-center border-b border-slate-800">
                  KD
                </th>
                <th className="p-4 text-center hidden sm:table-cell border-b border-slate-800">
                  Passe Atual
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.map((player, index) => (
                <tr
                  key={player.playerId}
                  className={`hover:bg-slate-800/60 transition-colors group ${
                    index < 3
                      ? "bg-gradient-to-r from-amber-500/5 to-transparent"
                      : ""
                  } ${player.isPaused ? "opacity-50 grayscale" : ""}`}
                >
                  <td
                    className="p-4 font-mono text-slate-500 font-bold w-16 text-center group-hover:text-white transition-colors cursor-pointer"
                    onClick={() => onPlayerClick(player.playerId)}
                  >
                    {index === 0 ? (
                      <span className="text-xl">🥇</span>
                    ) : index === 1 ? (
                      <span className="text-xl">🥈</span>
                    ) : index === 2 ? (
                      <span className="text-xl">🥉</span>
                    ) : (
                      <span className="text-sm">#{index + 1}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="relative cursor-pointer"
                        onClick={() => onPlayerClick(player.playerId)}
                      >
                        <img
                          src={player.avatarUrl}
                          alt={player.nickname}
                          className={`w-10 h-10 rounded-lg bg-slate-800 object-cover border-2 shadow-sm ${
                            index === 0
                              ? "border-amber-400 shadow-amber-400/20"
                              : "border-slate-700"
                          }`}
                        />
                        {player.isPaused && (
                          <div className="absolute -top-1 -right-1 bg-amber-500 text-black rounded-full p-0.5 shadow-sm">
                            <Ban size={10} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            onClick={() => onPlayerClick(player.playerId)}
                            className={`cursor-pointer font-bold text-sm leading-tight flex items-center gap-1.5 transition-colors ${
                              checkCosmetics(player).isPremium
                                ? checkCosmetics(player).nameClass
                                : index === 0
                                ? "text-amber-400"
                                : "text-slate-200 group-hover:text-amber-400"
                            }`}
                          >
                            {player.clanTag && (
                              <span className="text-amber-500 text-xs font-mono tracking-tight opacity-90">
                                [{player.clanTag}]
                              </span>
                            )}
                            {checkCosmetics(player).isPremium && (
                              <Crown
                                size={12}
                                className="text-amber-400 shrink-0"
                              />
                            )}
                            <span className="truncate">{player.nickname}</span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBreakdown(player);
                            }}
                            className="text-slate-600 hover:text-amber-400 transition-colors p-1 rounded hover:bg-slate-800"
                            title="Ver detalhes dos pontos"
                          >
                            <Info size={14} />
                          </button>
                          {player.isPaused && (
                            <span className="text-[9px] ml-1 text-amber-500 font-normal uppercase border border-amber-500/50 px-1.5 py-0.5 rounded bg-amber-900/20">
                              Pausado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center font-black text-lg text-white bg-slate-800/20 border-x border-slate-800/30 group-hover:bg-slate-800/40 transition-colors">
                    {player.points}
                  </td>
                  <td
                    className={`p-4 text-center font-mono font-bold text-sm ${
                      player.kd >= 1 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {player.kd.toFixed(2)}
                  </td>
                  <td className="p-4 text-center text-green-400 text-xs font-mono font-bold hidden sm:table-cell">
                    {formatCurrency(player.marketValue || 10000000)}
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-12 text-center text-slate-500 text-sm italic"
                  >
                    Ainda sem dados para exibir.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedBreakdown && (
        <PointsDetailsModal
          player={selectedBreakdown}
          onClose={() => setSelectedBreakdown(null)}
        />
      )}
    </>
  );
};

const PlayoffsPage = ({ data, activeSplit }) => {
  if (!activeSplit)
    return (
      <div className="text-center py-20 text-slate-500 font-mono text-sm uppercase tracking-widest border border-slate-800 border-dashed rounded-2xl">
        Nenhum Split Ativo para exibir Playoffs.
      </div>
    );

  const backend = new BackendController(data);
  const splitSeries = data.series
    .filter((s) => s.splitId === activeSplit.id)
    .map((s) => backend.getSeriesStatus(s));

  const quartas = splitSeries.filter((s) =>
    s.label.toLowerCase().includes("quarta")
  );
  const semis = splitSeries.filter((s) =>
    s.label.toLowerCase().includes("semi")
  );
  const finais = splitSeries.filter(
    (s) =>
      s.label.toLowerCase().includes("final") &&
      !s.label.toLowerCase().includes("semi")
  );

  const MatchBlock = ({ s }) => {
    if (!s)
      return (
        <div className="w-48 h-[72px] bg-slate-900/30 border border-slate-800/50 rounded-xl flex items-center justify-center text-slate-700 text-[10px] font-bold uppercase tracking-widest border-dashed">
          A Definir
        </div>
      );

    const isFinished = s.status === "Finalizada";

    return (
      <div
        className={`w-48 bg-slate-950 border ${
          isFinished
            ? "border-slate-700"
            : "border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.1)]"
        } rounded-xl overflow-hidden shadow-lg relative z-10 transition-transform hover:scale-105`}
      >
        <div className="bg-slate-900 px-3 py-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 text-center flex justify-between items-center">
          <span>{s.label}</span>
          {!isFinished && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <div
            className={`flex justify-between items-center px-3 py-2 border-b border-slate-800/50 ${
              s.finalWinner === "A"
                ? "bg-gradient-to-r from-amber-500/10 to-transparent text-white font-bold border-l-2 border-l-amber-400"
                : "text-slate-400 border-l-2 border-l-transparent"
            }`}
          >
            <span className="truncate text-xs">{s.teamA}</span>
            <span
              className={`font-mono text-sm ${
                s.finalWinner === "A" ? "text-amber-400" : ""
              }`}
            >
              {s.winsA}
            </span>
          </div>
          <div
            className={`flex justify-between items-center px-3 py-2 ${
              s.finalWinner === "B"
                ? "bg-gradient-to-r from-amber-500/10 to-transparent text-white font-bold border-l-2 border-l-amber-400"
                : "text-slate-400 border-l-2 border-l-transparent"
            }`}
          >
            <span className="truncate text-xs">{s.teamB}</span>
            <span
              className={`font-mono text-sm ${
                s.finalWinner === "B" ? "text-amber-400" : ""
              }`}
            >
              {s.winsB}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <Trophy className="text-amber-400" size={28} /> Caminho para a
            Glória
          </h2>
          <p className="text-slate-500 text-xs mt-1 font-medium">
            Chaveamento Oficial dos Playoffs • {activeSplit.name}
          </p>
        </div>
      </div>

      {splitSeries.length === 0 ? (
        <div className="text-center py-24 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl">
          <Trophy size={48} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
            A fase de Playoffs ainda não começou.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto pb-12 pt-4 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
          <div className="flex items-center justify-start md:justify-center gap-12 min-w-max p-4 relative">
            <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800/50 w-[80%] left-10 z-0 hidden md:block pointer-events-none"></div>

            {quartas.length > 0 && (
              <div className="flex flex-col justify-around gap-12 relative z-10">
                <h4 className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] bg-slate-950 px-3">
                  Quartas
                </h4>
                {quartas.map((s, i) => (
                  <MatchBlock key={i} s={s} />
                ))}
              </div>
            )}

            {(semis.length > 0 || quartas.length > 0) && (
              <div className="flex flex-col justify-around gap-20 relative z-10">
                <h4 className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase text-amber-500/50 tracking-[0.2em] bg-slate-950 px-3">
                  Semifinais
                </h4>
                {semis.length > 0 ? (
                  semis.map((s, i) => <MatchBlock key={i} s={s} />)
                ) : (
                  <>
                    <MatchBlock s={null} />
                    <MatchBlock s={null} />
                  </>
                )}
              </div>
            )}

            <div className="flex flex-col justify-around gap-8 relative z-10">
              <h4 className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] bg-slate-950 px-3 flex items-center gap-1">
                <Medal size={12} /> Grande Final
              </h4>
              {finais.length > 0 ? (
                finais.map((s, i) => <MatchBlock key={i} s={s} />)
              ) : (
                <MatchBlock s={null} />
              )}
            </div>

            {finais.length > 0 && finais[0].status === "Finalizada" && (
              <div className="flex flex-col justify-center items-center ml-4 relative z-10 animate-fadeIn">
                <div className="absolute -inset-10 bg-amber-500/20 rounded-full blur-3xl"></div>
                <div className="w-28 h-28 bg-gradient-to-br from-amber-300 to-amber-600 rounded-full p-1.5 shadow-[0_0_40px_rgba(251,191,36,0.5)] transform hover:scale-110 transition-transform cursor-default">
                  <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center text-center p-2 border-4 border-slate-950">
                    <Trophy size={20} className="text-amber-400 mb-1" />
                    <span className="text-amber-400 font-black text-[10px] uppercase leading-tight drop-shadow-md truncate w-full px-2">
                      {finais[0].finalWinner === "A"
                        ? finais[0].teamA
                        : finais[0].teamB}
                    </span>
                  </div>
                </div>
                <div className="mt-6 bg-slate-900 border border-amber-500/30 px-4 py-1.5 rounded-full shadow-lg">
                  <span className="text-amber-400 font-black tracking-widest uppercase text-[10px]">
                    Vencedor do Split
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const MarketPage = ({ data, onPlayerClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [marketTab, setMarketTab] = useState("overview");
  const sortedTransfers = [...data.transfers].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const valuablePlayers = [...data.players]
    .sort((a, b) => b.marketValue - a.marketValue)
    .slice(0, 5);
  const expiringSoon = data.players
    .filter((p) => !p.isPaused && getContractStatus(p).isExpiring)
    .sort(
      (a, b) =>
        (a.contractEnd ? new Date(a.contractEnd) - new Date() : -1) -
        (b.contractEnd ? new Date(b.contractEnd) - new Date() : -1)
    );
  const scoutPlayers = data.players
    .filter(
      (p) =>
        !p.isPaused &&
        p.nickname.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "all" ||
          (filter === "free" && !p.clanId) ||
          (filter === "contracted" && p.clanId))
    )
    .sort((a, b) => b.marketValue - a.marketValue);

  const isMarketOpen = data.settings?.marketStatus !== "closed";
  const reopenDate = data.settings?.marketReopenDate;
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (isMarketOpen || !reopenDate) return;
    const target = new Date(reopenDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return false;
      }
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000),
      });
      return true;
    };

    updateTimer();
    const interval = setInterval(() => {
      if (!updateTimer()) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [isMarketOpen, reopenDate]);

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="relative bg-slate-900 rounded-3xl p-10 border border-slate-800 overflow-hidden shadow-2xl">
        <div
          className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
            isMarketOpen ? "bg-green-500/5" : "bg-red-500/5"
          }`}
        ></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border ${
                isMarketOpen
                  ? "bg-green-500/10 text-green-400 border-green-500/20 animate-pulse"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isMarketOpen ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>{" "}
              {isMarketOpen ? "Mercado Aberto" : "Janela Fechada"}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
              Janela de Transferências
            </h2>
            <p className="text-slate-400 text-lg max-w-xl">
              {isMarketOpen
                ? "Acompanhe contratos, valores de mercado, transações e patrocínios."
                : "Mercado fechado. Acompanhe apenas contratos no fim, rumores e patrocínios."}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-center backdrop-blur-sm">
              <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">
                Total Movimentado
              </div>
              <div
                className={`text-2xl font-mono font-bold ${
                  isMarketOpen ? "text-green-400" : "text-slate-400"
                }`}
              >
                {formatCurrency(
                  data.transfers.reduce((acc, t) => acc + t.value, 0)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA DE NAVEGAÇÃO INTERNA DO MERCADO */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 w-fit overflow-x-auto max-w-full scrollbar-hide">
        <button
          onClick={() => setMarketTab("overview")}
          className={`shrink-0 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            marketTab === "overview"
              ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20 scale-105"
              : "text-slate-500 hover:text-white hover:bg-white/5"
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setMarketTab("scout")}
          className={`shrink-0 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
            marketTab === "scout"
              ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20 scale-105"
              : "text-slate-500 hover:text-white hover:bg-white/5"
          }`}
        >
          <Search size={14} /> Scout de Atletas{" "}
          {!isMarketOpen && <Lock size={12} />}
        </button>
        <button
          onClick={() => setMarketTab("sponsors")}
          className={`shrink-0 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
            marketTab === "sponsors"
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20 scale-105"
              : "text-slate-500 hover:text-white hover:bg-white/5"
          }`}
        >
          <Handshake size={14} /> Marcas Oficiais
        </button>
      </div>

      {/* ABA 1: VISÃO GERAL */}
      {marketTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-slate-800/30">
                <Search size={140} />
              </div>
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-3 tracking-tight border-b border-slate-800 pb-4 mb-6 relative z-10">
                <Search className="text-amber-400" size={20} />
                {isMarketOpen
                  ? "Radar de Contratos"
                  : "Especulações de Mercado"}
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 relative z-10 scrollbar-thin scrollbar-thumb-slate-800">
                {expiringSoon.map((player) => {
                  const status = getContractStatus(player);
                  return (
                    <div
                      key={player.id}
                      onClick={() => onPlayerClick(player.id)}
                      className="min-w-[200px] bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3 cursor-pointer hover:border-amber-400/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={player.avatarUrl}
                          className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-amber-400/30 transition-colors"
                        />
                        <div>
                          <div className="text-white font-bold text-sm truncate w-24 group-hover:text-amber-400 transition-colors">
                            {player.nickname}
                          </div>
                          <div className="text-slate-500 text-[10px]">
                            {player.clanId
                              ? data.clans.find((c) => c.id === player.clanId)
                                  ?.tag
                              : "S/ Clã"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            status.status === "Sem Contrato"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {status.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {expiringSoon.length === 0 && (
                  <div className="text-slate-500 text-sm italic">
                    Nenhum contrato próximo do fim.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full">
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-3 tracking-tight border-b border-slate-800 pb-4 mb-6">
                <ArrowRightLeft className="text-amber-400" size={20} /> Feed de
                Movimentações
              </h3>
              <div className="space-y-4">
                {sortedTransfers.map((transfer) => {
                  const isHired = transfer.type === "contract";
                  return (
                    <div
                      key={transfer.id}
                      className={`bg-slate-950 p-4 rounded-xl border flex items-center justify-between group transition-all ${
                        transfer.isHostile
                          ? "border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                          : "border-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                            transfer.isHostile
                              ? "bg-red-500/10 border-red-500/20 text-red-500"
                              : isHired
                              ? "bg-green-500/10 border-green-500/20 text-green-500"
                              : "bg-blue-500/10 border-blue-500/20 text-blue-500"
                          }`}
                        >
                          {transfer.isHostile ? (
                            <Zap size={20} />
                          ) : isHired ? (
                            <Briefcase size={20} />
                          ) : (
                            <ArrowRightLeft size={20} />
                          )}
                        </div>
                        <div>
                          <div
                            className={`font-bold text-sm flex items-center gap-1.5 cursor-pointer transition-colors ${
                              checkCosmetics(
                                data.players.find(
                                  (p) => p.id === transfer.playerId
                                )
                              ).isPremium
                                ? checkCosmetics(
                                    data.players.find(
                                      (p) => p.id === transfer.playerId
                                    )
                                  ).nameClass
                                : "text-white hover:text-amber-400"
                            }`}
                            onClick={() => onPlayerClick(transfer.playerId)}
                          >
                            {checkCosmetics(
                              data.players.find(
                                (p) => p.id === transfer.playerId
                              )
                            ).isPremium && (
                              <Crown
                                size={12}
                                className="text-amber-400 shrink-0"
                              />
                            )}
                            <span className="truncate">
                              {transfer.playerName}
                            </span>
                            {transfer.isHostile ? (
                              <span className="text-[9px] px-2 py-0.5 rounded uppercase font-black bg-red-600 text-white animate-pulse">
                                🚨 Compra Hostil
                              </span>
                            ) : (
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${
                                  isHired
                                    ? "bg-green-500 text-black"
                                    : "bg-blue-500 text-white"
                                }`}
                              >
                                {isHired
                                  ? "Contratação Livre"
                                  : "Acordo Amigável"}
                              </span>
                            )}
                          </div>
                          <div className="text-slate-500 text-xs mt-1 flex items-center gap-2">
                            {isHired ? (
                              <>
                                Contratado por{" "}
                                <span className="text-slate-300 font-bold">
                                  {transfer.toClanName}
                                </span>
                              </>
                            ) : (
                              <>
                                De{" "}
                                <span className="text-slate-300 font-bold">
                                  {data.clans.find(
                                    (c) => c.id === transfer.fromClanId
                                  )?.name || "Ex-Clã"}
                                </span>{" "}
                                para{" "}
                                <span className="text-slate-300 font-bold">
                                  {transfer.toClanName}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-mono font-bold text-sm ${
                            transfer.isHostile
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {formatCurrency(transfer.value)}
                        </div>
                        <div className="text-slate-600 text-[10px]">
                          {new Date(transfer.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {sortedTransfers.length === 0 && (
                  <div className="text-center py-12 text-slate-500 text-sm italic">
                    Nenhuma movimentação registrada.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-3 tracking-tight border-b border-slate-800 pb-4 mb-6">
                <TrendingUp className="text-amber-400" size={20} /> Passes
                Valiosos
              </h3>
              <div className="space-y-3">
                {valuablePlayers.map((player, idx) => (
                  <div
                    key={player.id}
                    onClick={() => onPlayerClick(player.id)}
                    className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800 cursor-pointer hover:bg-slate-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-slate-500 font-bold text-xs group-hover:text-amber-400">
                        #{idx + 1}
                      </div>
                      <img
                        src={player.avatarUrl}
                        className="w-8 h-8 rounded-md bg-slate-800 group-hover:ring-1 ring-amber-400 transition-all"
                      />
                      <div>
                        <div className="text-white font-bold text-xs group-hover:text-amber-300 transition-colors">
                          {player.nickname}
                        </div>
                        <div className="text-slate-500 text-[9px]">
                          {player.clanId
                            ? data.clans.find((c) => c.id === player.clanId)
                                ?.tag
                            : "Free Agent"}
                        </div>
                      </div>
                    </div>
                    <div className="text-green-400 font-mono font-bold text-xs">
                      {formatCurrency(player.marketValue)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-3 tracking-tight border-b border-slate-800 pb-4 mb-6">
                <Banknote className="text-amber-400" size={20} /> Orçamento dos
                Clãs
              </h3>
              <div className="space-y-3">
                {data.clans.map((clan) => (
                  <div
                    key={clan.id}
                    className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={clan.logoUrl}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="text-white font-bold text-xs">
                        {clan.name}
                      </div>
                    </div>
                    <div className="text-emerald-400 font-mono font-bold text-xs">
                      {formatCurrency(clan.budget)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: SCOUT DE ATLETAS COM BLOQUEIO E RELÓGIO */}
      {marketTab === "scout" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden animate-fadeIn relative">
          {!isMarketOpen && (
            <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6">
              <div className="bg-slate-900 p-8 rounded-3xl border border-red-500/30 text-center shadow-[0_0_50px_rgba(239,68,68,0.15)] max-w-lg w-full transform scale-110">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                  <Lock className="text-red-400" size={32} />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-3">
                  Scout Bloqueado
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  A janela de transferências oficiais está fechada. Os contratos
                  atuais estão blindados até a próxima reabertura.
                </p>

                {reopenDate && (
                  <div className="border-t border-slate-800 pt-6">
                    <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] block mb-4">
                      O Mercado abre em
                    </span>
                    <div className="flex justify-center gap-3 sm:gap-4">
                      <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 w-16 sm:w-20 text-center shadow-inner">
                        <div className="text-2xl sm:text-3xl font-mono font-black text-amber-400">
                          {timeLeft.d}
                        </div>
                        <div className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">
                          Dias
                        </div>
                      </div>
                      <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 w-16 sm:w-20 text-center shadow-inner">
                        <div className="text-2xl sm:text-3xl font-mono font-black text-amber-400">
                          {timeLeft.h.toString().padStart(2, "0")}
                        </div>
                        <div className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">
                          Horas
                        </div>
                      </div>
                      <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 w-16 sm:w-20 text-center shadow-inner">
                        <div className="text-2xl sm:text-3xl font-mono font-black text-amber-400">
                          {timeLeft.m.toString().padStart(2, "0")}
                        </div>
                        <div className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">
                          Min
                        </div>
                      </div>
                      <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 w-16 sm:w-20 text-center shadow-inner">
                        <div className="text-2xl sm:text-3xl font-mono font-black text-red-400 animate-pulse">
                          {timeLeft.s.toString().padStart(2, "0")}
                        </div>
                        <div className="text-[8px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">
                          Seg
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            className={`${
              !isMarketOpen
                ? "pointer-events-none opacity-20 blur-md select-none transition-all duration-700"
                : ""
            }`}
          >
            <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/50">
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-3 tracking-tight">
                <Users size={20} className="text-amber-400" /> Lista de Atletas
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    size={14}
                  />
                  <input
                    type="text"
                    placeholder="Buscar por nickname..."
                    className="bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-amber-400 w-full sm:w-64 transition-colors font-bold"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex bg-slate-950 rounded-lg border border-slate-700 p-1">
                  {["all", "free", "contracted"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${
                        filter === f
                          ? "bg-amber-400 text-black shadow-md"
                          : "text-slate-500 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {f === "all"
                        ? "Todos"
                        : f === "free"
                        ? "Livres"
                        : "Com Contrato"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-5 border-b border-slate-800">Jogador</th>
                    <th className="p-5 border-b border-slate-800 text-center">
                      Vínculo
                    </th>
                    <th className="p-5 border-b border-slate-800 text-center">
                      Contrato
                    </th>
                    <th className="p-5 border-b border-slate-800 text-right">
                      Multa Rescisória
                    </th>
                    <th className="p-5 border-b border-slate-800 text-right text-amber-500/80">
                      Salário/Mapa
                    </th>
                    <th className="p-5 border-b border-slate-800 text-right">
                      Valor do Passe
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {scoutPlayers.map((p) => {
                    const clan = data.clans.find((c) => c.id === p.clanId);
                    const status = getContractStatus(p);
                    const penaltyValue = calculateReleaseClause(
                      p.marketValue || 10000000,
                      p.releaseClauseMultiplier
                    );
                    const matchSalary = (p.marketValue || 10000000) * 0.005;
                    return (
                      <tr
                        key={p.id}
                        onClick={() => onPlayerClick(p.id)}
                        className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                      >
                        <td className="p-5">
                          <div className="flex items-center gap-4">
                            <img
                              src={p.avatarUrl}
                              className="w-10 h-10 rounded-lg bg-slate-800 shadow-sm group-hover:ring-1 ring-amber-400 transition-all"
                            />
                            <div>
                              <div
                                className={`font-bold text-sm transition-colors flex items-center gap-1.5 ${
                                  checkCosmetics(p).isPremium
                                    ? checkCosmetics(p).nameClass
                                    : "text-slate-200 group-hover:text-amber-400"
                                }`}
                              >
                                {checkCosmetics(p).isPremium && (
                                  <Crown
                                    size={12}
                                    className="text-amber-400 shrink-0"
                                  />
                                )}
                                <span className="truncate">{p.nickname}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                {p.gameId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 text-center">
                          {clan ? (
                            <div className="flex items-center justify-center gap-2">
                              <img
                                src={clan.logoUrl}
                                className="w-5 h-5 object-contain"
                              />
                              <span className="font-bold text-slate-300 text-xs">
                                {clan.tag}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-500 italic text-[10px] uppercase font-bold tracking-wider">
                              Agente Livre
                            </span>
                          )}
                        </td>
                        <td className="p-5 text-center">
                          <span
                            className={`text-[9px] px-2 py-1 rounded font-black uppercase tracking-wider border ${status.color} border-current opacity-80`}
                          >
                            {status.status}
                          </span>
                        </td>
                        <td className="p-5 text-right font-mono font-bold">
                          {status.isValid && penaltyValue > 0 ? (
                            <span className="text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                              + {formatCurrency(penaltyValue)}
                            </span>
                          ) : (
                            <span className="text-slate-600">--</span>
                          )}
                        </td>
                        <td className="p-5 text-right font-mono font-bold text-amber-500/80">
                          {formatCurrency(matchSalary)}
                        </td>
                        <td className="p-5 text-right font-mono font-black text-emerald-400 text-sm">
                          {formatCurrency(p.marketValue || 10000000)}
                        </td>
                      </tr>
                    );
                  })}
                  {scoutPlayers.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-12 text-center text-slate-500 text-sm italic"
                      >
                        Nenhum jogador encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: VITRINE DE MARCAS (O GRANDE CHARME COM PRESTÍGIO TOTAL) */}
      {marketTab === "sponsors" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 md:p-10 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-800 pb-6">
            <div>
              <h3 className="text-2xl font-black text-white uppercase flex items-center gap-3 tracking-tight">
                <Handshake className="text-blue-400" size={28} /> Vitrine de
                Marcas
              </h3>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Bata as metas, atraia visibilidade e assine contratos
                milionários para seu Clã.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.sponsors?.map((sponsor) => {
              const clan = data.clans.find((c) => c.id === sponsor.clanId);
              const isAvailable = !clan;

              return (
                <div
                  key={sponsor.id}
                  className={`relative bg-slate-950 p-6 rounded-2xl border flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                    isAvailable
                      ? "border-emerald-500/30 hover:border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                      : "border-blue-500/30 hover:border-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.05)]"
                  }`}
                >
                  {sponsor.isPremium && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                  )}

                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center shadow-inner shrink-0 ${
                        sponsor.isPremium ? "ring-2 ring-amber-400" : ""
                      }`}
                    >
                      <img
                        src={sponsor.logoUrl}
                        className="max-w-full max-h-full object-contain drop-shadow-sm"
                        alt={sponsor.name}
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xl uppercase tracking-tight leading-tight line-clamp-1">
                        {sponsor.name}
                      </h4>
                      {sponsor.isPremium && (
                        <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gradient-to-r from-amber-400 to-amber-600 text-black shadow-md flex items-center gap-1 w-fit mt-1.5">
                          <Crown size={10} /> Premium
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 flex-1 flex flex-col justify-center relative shadow-inner">
                    <div className="text-center mb-4">
                      <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">
                        {sponsor.type === "victory"
                          ? "Bônus por Vitória"
                          : "Cota por Mapa Jogado"}
                      </div>
                      <div className="text-2xl font-mono font-black text-amber-400">
                        {formatCurrency(sponsor.amount)}
                      </div>
                    </div>

                    {!sponsor.isPremium && (
                      <div className="flex flex-wrap justify-center gap-2 mt-2 pt-4 border-t border-slate-800/50">
                        {sponsor.cost > 0 && (
                          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-slate-950 text-slate-300 border border-slate-700">
                            Luvas: {formatCurrency(sponsor.cost)}
                          </span>
                        )}
                        {sponsor.reqTitles > 0 && (
                          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-slate-950 text-slate-300 border border-slate-700 flex items-center gap-1">
                            <Trophy size={10} /> {sponsor.reqTitles} Títulos
                          </span>
                        )}
                        {sponsor.tolerance > 0 && (
                          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-slate-950 text-red-400 border border-red-900/30 flex items-center gap-1">
                            <AlertTriangle size={10} /> Tolera{" "}
                            {sponsor.tolerance} Derrotas
                          </span>
                        )}
                      </div>
                    )}
                    {sponsor.isPremium && (
                      <div className="text-center mt-2 pt-4 border-t border-slate-800/50 text-[10px] text-amber-500/70 font-bold uppercase tracking-widest">
                        Vitalício • Sem Custos
                      </div>
                    )}
                  </div>

                  {isAvailable ? (
                    <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-black uppercase tracking-widest border transition-colors bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                      <span className="leading-none text-sm mt-px">✅</span>
                      <span className="truncate">Aguardando Proposta</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest border transition-colors bg-blue-500/10 text-blue-400 border-blue-500/30">
                      <span className="leading-none text-sm mt-px">🤝</span>
                      <span className="truncate">Patrocina: {clan.name}</span>
                    </div>
                  )}
                </div>
              );
            })}
            {(!data.sponsors || data.sponsors.length === 0) && (
              <div className="col-span-full py-16 text-center border border-dashed border-slate-800 rounded-2xl text-slate-500">
                <Handshake size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">
                  Nenhum patrocinador oficial cadastrado na liga ainda.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
function DraggableMenuItem({
  id,
  label,
  index,
  icon: Icon,
  isActive,
  onClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) {
  const handleDragStart = (e) => {
    onDragStart(index);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    onDragEnter(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragEnd={onDragEnd}
      className="mb-2 transition-transform duration-200"
    >
      <button
        onClick={onClick}
        className={`w-full text-left p-4 rounded-xl font-bold uppercase text-xs flex items-center gap-3 transition-all group relative cursor-pointer border ${
          isActive
            ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20 border-amber-500 scale-[1.02]"
            : "bg-slate-900 text-slate-400 hover:bg-slate-800 border-slate-800 hover:border-slate-700"
        }`}
      >
        <div className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-black/10 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2">
          <GripVertical size={14} />
        </div>
        <Icon
          size={18}
          className={
            isActive
              ? "text-black"
              : "text-slate-500 group-hover:text-amber-400 transition-colors"
          }
        />{" "}
        {label}
      </button>
    </div>
  );
}

const TreasuryModal = ({ clan, logs, onClose, onUpdateFinancials }) => {
  const [mode, setMode] = useState("adjust");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const clanLogs = logs
    .filter((l) => l.clanId === clan.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const handleSubmit = () => {
    if (!amount || !reason)
      return alert("Por favor, preencha o valor e a justificativa.");
    const val = parseFloat(amount);
    if (isNaN(val) || val < 0) return alert("Valor inválido.");
    let newBalance;
    let type;
    if (mode === "adjust") {
      newBalance = val;
      type = "adjustment";
    } else if (mode === "penalty") {
      newBalance = clan.budget - val;
      type = "penalty";
    } else if (mode === "bonus") {
      newBalance = clan.budget + val;
      type = "bonus";
    }
    onUpdateFinancials(clan.id, newBalance, reason, type);
    setAmount("");
    setReason("");
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-white font-bold uppercase flex items-center gap-2 text-sm">
            <Landmark className="text-amber-500" size={18} /> Tesouraria do Clã
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-5 rounded-xl">
            <div className="flex items-center gap-4">
              <img
                src={clan.logoUrl}
                className="w-12 h-12 object-contain"
                alt={clan.tag}
              />
              <div>
                <h4 className="text-white font-black text-xl uppercase tracking-tight">
                  {clan.name}
                </h4>
                <span className="text-slate-500 text-[10px] font-mono tracking-widest">
                  [{clan.tag}]
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">
                Saldo Atual
              </div>
              <div
                className={`text-2xl font-mono font-black ${
                  clan.budget < 0 ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {formatCurrency(clan.budget)}
              </div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-inner">
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setMode("adjust")}
                className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${
                  mode === "adjust"
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-600"
                }`}
              >
                Definir Novo Saldo
              </button>
              <button
                onClick={() => setMode("bonus")}
                className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${
                  mode === "bonus"
                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-600"
                }`}
              >
                Adicionar Fundo
              </button>
              <button
                onClick={() => setMode("penalty")}
                className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${
                  mode === "penalty"
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-600"
                }`}
              >
                Aplicar Multa
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                  {mode === "adjust"
                    ? "Novo Saldo Exato"
                    : mode === "bonus"
                    ? "Valor a Adicionar"
                    : "Valor da Multa"}
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  className={`w-full bg-slate-950 border rounded-lg p-3 text-white text-sm outline-none font-mono transition-colors ${
                    mode === "adjust"
                      ? "focus:border-amber-500 border-slate-700"
                      : mode === "bonus"
                      ? "focus:border-emerald-500 border-emerald-500/30"
                      : "focus:border-red-500 border-red-500/30"
                  }`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                  Justificativa / Motivo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Correção de caixa, Punição por W.O..."
                  className={`w-full bg-slate-950 border rounded-lg p-3 text-white text-sm outline-none transition-colors ${
                    mode === "adjust"
                      ? "focus:border-amber-500 border-slate-700"
                      : mode === "bonus"
                      ? "focus:border-emerald-500 border-emerald-500/30"
                      : "focus:border-red-500 border-red-500/30"
                  }`}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className={`mt-4 w-full font-bold uppercase py-3.5 rounded-lg text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                mode === "adjust"
                  ? "bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20"
                  : mode === "bonus"
                  ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20"
                  : "bg-red-600 hover:bg-red-500 text-white shadow-red-600/20"
              }`}
            >
              {mode === "adjust"
                ? "Confirmar Ajuste"
                : mode === "bonus"
                ? "Lançar Bônus"
                : "Aplicar Multa"}
            </button>
          </div>
          <div>
            <h4 className="text-slate-400 font-bold text-xs uppercase mb-4 flex items-center gap-2 tracking-widest border-b border-slate-800 pb-2">
              <FileText size={14} /> Extrato de Auditoria
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {clanLogs.map((log) => {
                const isPositive = log.amount > 0;
                const isNeutral = log.amount === 0;
                return (
                  <div
                    key={log.id}
                    className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="text-white font-bold text-sm mb-0.5">
                        {log.reason}
                      </div>
                      <div className="text-slate-500 text-[10px] flex items-center gap-2">
                        <span>{new Date(log.date).toLocaleString()}</span>
                        <span className="uppercase font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-[8px]">
                          {log.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-mono font-bold text-sm ${
                          isPositive
                            ? "text-emerald-400"
                            : isNeutral
                            ? "text-slate-400"
                            : "text-red-400"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {formatCurrency(log.amount)}
                      </div>
                      <div className="text-slate-600 text-[9px] font-mono mt-0.5">
                        Saldo: {formatCurrency(log.newBalance)}
                      </div>
                    </div>
                  </div>
                );
              })}
              {clanLogs.length === 0 && (
                <div className="text-center py-8 text-slate-600 text-xs italic border border-dashed border-slate-800 rounded-xl">
                  Nenhum registro financeiro encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContractModal = ({ player, onClose, onUpdateContract }) => {
  const [dateEnd, setDateEnd] = useState(
    player.contractEnd
      ? new Date(player.contractEnd).toISOString().split("T")[0]
      : ""
  );
  const [multiplier, setMultiplier] = useState(
    player.releaseClauseMultiplier || 0
  );
  const handleSubmit = () => {
    onUpdateContract(player.id, dateEnd, multiplier);
  };
  const penaltyValue = calculateReleaseClause(
    player.marketValue || 10000000,
    multiplier
  );
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-white font-bold uppercase flex items-center gap-2 text-sm">
            <FileText className="text-amber-500" size={18} /> Gerenciar Contrato
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <img
              src={player.avatarUrl}
              className="w-12 h-12 rounded-lg bg-slate-800"
            />
            <div>
              <h4 className="text-white font-bold text-lg leading-tight">
                {player.nickname}
              </h4>
              <div className="text-slate-500 text-xs">
                Passe Base:{" "}
                <span className="text-green-400 font-mono font-bold">
                  {formatCurrency(player.marketValue || 10000000)}
                </span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
              Vencimento do Contrato
            </label>
            <input
              type="date"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm outline-none focus:border-amber-500 transition-colors"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Deixe em branco para encerrar o contrato.
            </p>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <label className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                Multa Rescisória (Blindagem)
              </label>
              <span className="text-amber-400 font-mono font-bold text-xs">
                {(multiplier * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="0.4"
              step="0.05"
              className="w-full accent-amber-500 mb-4"
              value={multiplier}
              onChange={(e) => setMultiplier(parseFloat(e.target.value))}
            />
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-500 font-bold uppercase">
                Valor Extra da Multa:
              </span>
              <span className="text-lg font-mono font-black text-red-400">
                + {formatCurrency(penaltyValue)}
              </span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase py-3.5 rounded-lg text-sm transition-all shadow-lg shadow-amber-500/20"
          >
            Salvar Contrato
          </button>
        </div>
      </div>
    </div>
  );
};

// --- A NOVA MÁGICA: O MODAL INTELIGENTE DE MD3 (COM LÓGICA 5V5 E RESERVAS) ---
const TournamentMD3Modal = ({
  series,
  data,
  onClose,
  onSaveMatch,
  onDeleteMatch,
  onUpdateSeries,
}) => {
  const [isAddingMap, setIsAddingMap] = useState(false);
  const [editingMapId, setEditingMapId] = useState(null);
  const [newMapName, setNewMapName] = useState("");
  const [scoreA, setScoreA] = useState("");
  const [scoreB, setScoreB] = useState("");
  const [winnerSide, setWinnerSide] = useState(null);

  const clanA = data.clans.find((c) => c.id === series.clanA_Id) || {
    tag: "BLU",
    name: series.teamA,
    id: "tempA",
  };
  const clanB = data.clans.find((c) => c.id === series.clanB_Id) || {
    tag: "RED",
    name: series.teamB,
    id: "tempB",
  };
  const playersA = series.mixPlayersA
    ? data.players.filter((p) => series.mixPlayersA.includes(p.id))
    : data.players.filter((p) => p.clanId === clanA.id && !p.isPaused);
  const playersB = series.mixPlayersB
    ? data.players.filter((p) => series.mixPlayersB.includes(p.id))
    : data.players.filter((p) => p.clanId === clanB.id && !p.isPaused);

  // Novo Sistema de 5 Slots (Para lidar com Reservas)
  const [lineupA, setLineupA] = useState([]);
  const [lineupB, setLineupB] = useState([]);

  const backend = new BackendController(data);
  const status = backend.getSeriesStatus(series);
  const isFinished = status?.status === "Finalizada";
  const playedMatches = (series.matchIds || [])
    .map((id) => data.matches.find((m) => m.id === id))
    .filter(Boolean);

  // Inicia os 5 slots pegando os primeiros jogadores por padrão
  const initializeLineup = (playersList) => {
    return Array(5)
      .fill(null)
      .map((_, i) => ({
        playerId: playersList[i] ? playersList[i].id : "",
        kills: 0,
        deaths: 0,
      }));
  };

  const handleOpenAddMap = () => {
    setLineupA(initializeLineup(playersA));
    setLineupB(initializeLineup(playersB));
    setNewMapName("");
    setScoreA("");
    setScoreB("");
    setWinnerSide(null);
    setEditingMapId(null);
    setIsAddingMap(true);
  };

  const loadMapForEditing = (m) => {
    setNewMapName(m.mapName);
    setScoreA(m.scoreA);
    setScoreB(m.scoreB);
    setWinnerSide(m.winnerSide);
    setEditingMapId(m.id);
    const mStats = data.stats.filter((s) => s.matchId === m.id);

    // Puxa quem jogou e preenche os 5 slots
    const fillSlots = (clanPlayers) => {
      const statsDoCla = mStats.filter((s) =>
        clanPlayers.some((p) => p.id === s.playerId)
      );
      const slots = Array(5).fill({ playerId: "", kills: 0, deaths: 0 });
      statsDoCla.forEach((s, i) => {
        if (i < 5)
          slots[i] = { playerId: s.playerId, kills: s.kills, deaths: s.deaths };
      });
      return slots;
    };

    setLineupA(fillSlots(playersA));
    setLineupB(fillSlots(playersB));
    setIsAddingMap(true);
  };

  const handleDeleteMap = (mapId) => {
    if (
      window.confirm(
        "Excluir este mapa apagará os status dos jogadores desta partida. Continuar?"
      )
    ) {
      onDeleteMatch(mapId);
      onUpdateSeries(series.id, {
        matchIds: series.matchIds.filter((id) => id !== mapId),
      });
    }
  };

  const handleSaveMap = () => {
    if (!newMapName || !winnerSide)
      return alert("Por favor, selecione o mapa jogado e defina o vencedor.");

    // Pega apenas os slots que têm jogador selecionado
    const validStatsA = lineupA
      .filter((s) => s.playerId)
      .map((s) => ({ ...s, mapWin: winnerSide === "A" }));
    const validStatsB = lineupB
      .filter((s) => s.playerId)
      .map((s) => ({ ...s, mapWin: winnerSide === "B" }));
    const consolidatedStats = [...validStatsA, ...validStatsB];

    // CORREÇÃO CRÍTICA: Mesma ID para o Mapa e para a Série
    const matchIdToSave = editingMapId || generateId();

    onSaveMatch(
      {
        splitId: series.splitId,
        md3GroupId: series.label,
        mapName: newMapName,
        winnerSide,
        scoreA: parseInt(scoreA) || 0,
        scoreB: parseInt(scoreB) || 0,
        clanA_Id: clanA.id,
        clanB_Id: clanB.id,
        stage: series.stage || "Fase de Grupos",
      },
      consolidatedStats,
      matchIdToSave,
      new Date().toISOString()
    );

    if (!editingMapId) {
      onUpdateSeries(series.id, {
        matchIds: [...(series.matchIds || []), matchIdToSave],
      });
    }

    setIsAddingMap(false);
    setEditingMapId(null);
  };

  const updateSlot = (team, index, field, value) => {
    const setLineup = team === "A" ? setLineupA : setLineupB;
    setLineup((prev) => {
      const newArr = [...prev];
      newArr[index] = { ...newArr[index], [field]: value };
      return newArr;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl shadow-2xl relative flex flex-col my-8">
        {/* Header Dinâmico */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 z-20 rounded-t-3xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
              <Layers size={14} /> {series.stage} • {series.label}
            </div>
            {isFinished && (
              <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle size={12} /> Série Encerrada
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white bg-slate-800 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Placar Global da MD3 */}
        <div className="p-8 pb-6 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800/50">
          <div className="flex items-center justify-center gap-6 md:gap-16">
            <div
              className={`flex flex-col items-center ${
                status?.winsA > status?.winsB
                  ? "scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  : "opacity-80"
              } transition-all`}
            >
              {clanA?.logoUrl ? (
                <img
                  src={clanA.logoUrl}
                  className="w-20 h-20 md:w-28 md:h-28 object-contain mb-4 drop-shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-slate-800 rounded-full mb-4 flex items-center justify-center text-slate-500">
                  ?
                </div>
              )}
              <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight">
                {clanA?.name}
              </h3>
              <span className="text-blue-400 font-bold text-sm mt-1 uppercase tracking-widest text-[10px]">
                Time Blue
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-600 font-black text-2xl mb-4">
                VS
              </span>
              <div className="flex gap-4 items-center bg-slate-950 px-6 py-3 rounded-2xl border border-slate-800 shadow-inner">
                <span
                  className={`text-5xl font-mono font-black ${
                    status?.winsA > status?.winsB
                      ? "text-blue-400"
                      : "text-slate-300"
                  }`}
                >
                  {status?.winsA || 0}
                </span>
                <span className="text-slate-700 text-3xl">-</span>
                <span
                  className={`text-5xl font-mono font-black ${
                    status?.winsB > status?.winsA
                      ? "text-red-400"
                      : "text-slate-300"
                  }`}
                >
                  {status?.winsB || 0}
                </span>
              </div>
            </div>

            <div
              className={`flex flex-col items-center ${
                status?.winsB > status?.winsA
                  ? "scale-110 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                  : "opacity-80"
              } transition-all`}
            >
              {clanB?.logoUrl ? (
                <img
                  src={clanB.logoUrl}
                  className="w-20 h-20 md:w-28 md:h-28 object-contain mb-4 drop-shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-slate-800 rounded-full mb-4 flex items-center justify-center text-slate-500">
                  ?
                </div>
              )}
              <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight">
                {clanB?.name}
              </h3>
              <span className="text-red-400 font-bold text-sm mt-1 uppercase tracking-widest text-[10px]">
                Time Red
              </span>
            </div>
          </div>
        </div>

        {/* Histórico de Mapas */}
        <div className="p-8 bg-slate-950 flex-1">
          <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
            <h4 className="text-white font-bold uppercase text-sm flex items-center gap-2">
              <MapIcon size={16} className="text-amber-500" /> Mapas Jogados
              nesta Série
            </h4>
          </div>

          <div className="space-y-3 mb-8">
            {playedMatches.map((m, idx) => (
              <div
                key={m.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-8 h-8 bg-slate-950 rounded border border-slate-700 flex items-center justify-center font-bold text-slate-500 text-xs shadow-inner">
                    M{idx + 1}
                  </div>
                  <div>
                    <div className="text-white font-bold uppercase">
                      {m.mapName}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {new Date(m.date).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between">
                  <div className="flex items-center gap-6">
                    <div className="font-mono text-xl font-black bg-slate-950 px-4 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
                      <span
                        className={
                          m.winnerSide === "A"
                            ? "text-blue-400"
                            : "text-slate-600"
                        }
                      >
                        {m.scoreA}
                      </span>
                      <span className="text-slate-700 text-sm">x</span>
                      <span
                        className={
                          m.winnerSide === "B"
                            ? "text-red-400"
                            : "text-slate-600"
                        }
                      >
                        {m.scoreB}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-md border hidden sm:block ${
                        m.winnerSide === "A"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      Vitória {m.winnerSide === "A" ? "Blue" : "Red"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
                    <button
                      onClick={() => loadMapForEditing(m)}
                      className="p-2.5 bg-slate-950 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg border border-slate-800 transition-colors"
                      title="Editar Partida"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteMap(m.id)}
                      className="p-2.5 bg-slate-950 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg border border-slate-800 transition-colors"
                      title="Excluir Partida"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {playedMatches.length === 0 && !isAddingMap && (
              <div className="text-center py-10 text-slate-600 text-sm italic border border-dashed border-slate-800 rounded-xl">
                Nenhum mapa registrado ainda.
              </div>
            )}
          </div>

          {/* Formulário Interativo de Novo Mapa / Edição */}
          {isAddingMap ? (
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(251,191,36,0.05)] relative animate-fadeIn">
              <button
                onClick={() => {
                  setIsAddingMap(false);
                  setEditingMapId(null);
                }}
                className="absolute top-4 right-4 text-slate-500 hover:text-white bg-slate-800 p-1.5 rounded-full"
              >
                <X size={16} />
              </button>
              <h4 className="text-amber-400 font-bold uppercase text-sm mb-6 flex items-center gap-2 pb-2 border-b border-slate-800">
                {editingMapId ? (
                  <>
                    <Pencil size={16} /> Editando Resultado do Mapa
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Lançar Novo Mapa
                  </>
                )}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                    Qual foi o Mapa?
                  </label>
                  <select
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm outline-none focus:border-amber-400"
                    value={newMapName}
                    onChange={(e) => setNewMapName(e.target.value)}
                  >
                    <option value="">Selecionar...</option>
                    {data.maps
                      .filter((m) => m.isActive)
                      .map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                    Placar Final (Rounds)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-3 bg-blue-500/5 p-2 rounded-lg border border-blue-500/20">
                      <span className="text-blue-400 font-bold text-xs uppercase w-12 text-center">
                        {clanA?.tag}
                      </span>
                      <input
                        type="number"
                        className="w-full bg-slate-950 border border-blue-500/30 rounded p-2 text-white text-center font-mono font-black text-lg focus:border-blue-400 outline-none"
                        placeholder="0"
                        value={scoreA}
                        onChange={(e) => setScoreA(e.target.value)}
                      />
                    </div>
                    <span className="text-slate-600 font-black text-xl">X</span>
                    <div className="flex-1 flex items-center gap-3 bg-red-500/5 p-2 rounded-lg border border-red-500/20">
                      <input
                        type="number"
                        className="w-full bg-slate-950 border border-red-500/30 rounded p-2 text-white text-center font-mono font-black text-lg focus:border-red-400 outline-none"
                        placeholder="0"
                        value={scoreB}
                        onChange={(e) => setScoreB(e.target.value)}
                      />
                      <span className="text-red-400 font-bold text-xs uppercase w-12 text-center">
                        {clanB?.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <label className="block text-slate-400 text-[10px] uppercase font-bold mb-3">
                Line-up e Estatísticas (5v5)
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* LADO AZUL */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                  <div className="bg-blue-500/10 text-blue-400 font-bold uppercase text-[10px] p-3 border-b border-blue-500/20 flex justify-between items-center tracking-widest">
                    <span>Time Blue ({clanA?.tag})</span>
                    <span>K / D</span>
                  </div>
                  <div className="p-3 space-y-2">
                    {lineupA.map((slot, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="text-[10px] font-mono text-slate-600 font-black">
                          {idx + 1}
                        </div>
                        <select
                          value={slot.playerId}
                          onChange={(e) =>
                            updateSlot("A", idx, "playerId", e.target.value)
                          }
                          className="flex-1 bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white outline-none focus:border-blue-400"
                        >
                          <option value="" className="text-slate-500">
                            Selecionar Jogador...
                          </option>
                          {playersA.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.nickname}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="0"
                          placeholder="K"
                          className="w-14 bg-slate-900 border border-slate-700 rounded p-2 text-center text-sm text-green-400 font-mono font-bold outline-none focus:border-green-400"
                          value={slot.kills === 0 ? "" : slot.kills}
                          onChange={(e) =>
                            updateSlot(
                              "A",
                              idx,
                              "kills",
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                        <input
                          type="number"
                          min="0"
                          placeholder="D"
                          className="w-14 bg-slate-900 border border-slate-700 rounded p-2 text-center text-sm text-red-400 font-mono font-bold outline-none focus:border-red-400"
                          value={slot.deaths === 0 ? "" : slot.deaths}
                          onChange={(e) =>
                            updateSlot(
                              "A",
                              idx,
                              "deaths",
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* LADO VERMELHO */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                  <div className="bg-red-500/10 text-red-400 font-bold uppercase text-[10px] p-3 border-b border-red-500/20 flex justify-between items-center tracking-widest">
                    <span>Time Red ({clanB?.tag})</span>
                    <span>K / D</span>
                  </div>
                  <div className="p-3 space-y-2">
                    {lineupB.map((slot, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="text-[10px] font-mono text-slate-600 font-black">
                          {idx + 1}
                        </div>
                        <select
                          value={slot.playerId}
                          onChange={(e) =>
                            updateSlot("B", idx, "playerId", e.target.value)
                          }
                          className="flex-1 bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white outline-none focus:border-red-400"
                        >
                          <option value="" className="text-slate-500">
                            Selecionar Jogador...
                          </option>
                          {playersB.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.nickname}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="0"
                          placeholder="K"
                          className="w-14 bg-slate-900 border border-slate-700 rounded p-2 text-center text-sm text-green-400 font-mono font-bold outline-none focus:border-green-400"
                          value={slot.kills === 0 ? "" : slot.kills}
                          onChange={(e) =>
                            updateSlot(
                              "B",
                              idx,
                              "kills",
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                        <input
                          type="number"
                          min="0"
                          placeholder="D"
                          className="w-14 bg-slate-900 border border-slate-700 rounded p-2 text-center text-sm text-red-400 font-mono font-bold outline-none focus:border-red-400"
                          value={slot.deaths === 0 ? "" : slot.deaths}
                          onChange={(e) =>
                            updateSlot(
                              "B",
                              idx,
                              "deaths",
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                    Vencedor do Mapa:
                  </span>
                  <button
                    onClick={() => setWinnerSide("A")}
                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase transition-all border ${
                      winnerSide === "A"
                        ? "bg-blue-500 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                        : "bg-slate-900 text-slate-500 border-slate-700 hover:border-blue-500/50"
                    }`}
                  >
                    Blue
                  </button>
                  <button
                    onClick={() => setWinnerSide("B")}
                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase transition-all border ${
                      winnerSide === "B"
                        ? "bg-red-500 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                        : "bg-slate-900 text-slate-500 border-slate-700 hover:border-red-500/50"
                    }`}
                  >
                    Red
                  </button>
                </div>
                <button
                  onClick={handleSaveMap}
                  className="w-full md:w-auto bg-amber-400 hover:bg-amber-300 text-black font-black uppercase px-10 py-3.5 rounded-lg text-sm transition-transform hover:scale-105 shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
                >
                  <Check size={16} />{" "}
                  {editingMapId ? "Salvar Edição" : "Salvar Mapa"}
                </button>
              </div>
            </div>
          ) : (
            !isFinished && (
              <button
                onClick={handleOpenAddMap}
                className="w-full bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 border-dashed text-slate-400 hover:text-amber-400 font-bold uppercase py-8 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all"
              >
                <Plus size={24} className="mb-1" /> Adicionar Novo Mapa à Série
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// --- RESTANTE DO ADMIN PANEL (IGUAL, MAS COM A ABA DE TORNEIO REESTRUTURADA) ---
const AdminPanel = ({
  data,
  onAddSponsor,
  onUpdateSponsor,
  onDeleteSponsor,
  onAddPlayer,
  onUpdatePlayer,
  onUpdateContract,
  onRemovePlayer,
  onPausePlayer,
  onBanPlayer,
  onUnbanPlayer,
  onAddSplit,
  onUpdateSplit,
  onEndSplit,
  onSaveMatch,
  onDeleteMatch,
  onAddNews,
  onRemoveNews,
  onAddMap,
  onToggleMap,
  onRemoveMap,
  onAddChampionship,
  onUpdateChampionship,
  onRemoveChampionship,
  onUpdateSettings,
  onMenuOrderChange,
  onAddSeries,
  onUpdateSeries,
  onDeleteSeries,
  onAddClan,
  onUpdateClan,
  onDeleteClan,
  onAssignPlayerToClan,
  onRemovePlayerFromClan,
  onTransferPlayer,
  onUpdateClanFinancials,
  onLogout,
  onHome,
  onToggleClanEnrollment,
  onGenerateGroupStage,
  onGeneratePlayoffs,
  onUndoGroupStage,
  onUndoPlayoffs,
  onGenerateMixTournament,
  onToggleMarketStatus,
  onApplySoftReset,
  onAddStoreItem,
  onDeleteStoreItem,
  onUpdateStoreItem,
  onSellStoreItem,
}) => {
  const [editingStoreItemId, setEditingStoreItemId] = useState(null);
  const [newStoreItemName, setNewStoreItemName] = useState("");
  const [newStoreItemCategory, setNewStoreItemCategory] = useState("ingame");
  const [newStoreItemPrice, setNewStoreItemPrice] = useState("");
  const [newStoreItemStock, setNewStoreItemStock] = useState("");
  const [newStoreItemIsPremium, setNewStoreItemIsPremium] = useState(false);
  const [newSponsorName, setNewSponsorName] = useState("");
  const [newSponsorLogo, setNewSponsorLogo] = useState("");
  const [newSponsorType, setNewSponsorType] = useState("victory");
  const [newSponsorAmount, setNewSponsorAmount] = useState("");
  const [newSponsorClan, setNewSponsorClan] = useState("");
  const [editingSponsorId, setEditingSponsorId] = useState(null);

  // NOVOS CAMPOS DE ESTRATÉGIA E PREMIUM:
  const [newSponsorCost, setNewSponsorCost] = useState("");
  const [newSponsorReqTitles, setNewSponsorReqTitles] = useState("0");
  const [newSponsorIsPremium, setNewSponsorIsPremium] = useState(false);
  const [newSponsorTolerance, setNewSponsorTolerance] = useState("3");
  const [newStoreItemImage, setNewStoreItemImage] = useState("");
  const [activeTab, setActiveTab] = useState("tournament");
  const [feedback, setFeedback] = useState("");
  const [selectedSplitId, setSelectedSplitId] = useState("");
  const [activeMD3Series, setActiveMD3Series] = useState(null);
  const [selectedPlayersForMix, setSelectedPlayersForMix] = useState([]);
  const [mixSummary, setMixSummary] = useState(null);

  const [newPlayer, setNewPlayer] = useState({ nickname: "", gameId: "" });
  const [newPlayerImage, setNewPlayerImage] = useState("");
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [showBanModal, setShowBanModal] = useState(false);
  const [selectedPlayerToBan, setSelectedPlayerToBan] = useState(null);
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState("permanent");
  const [showUnbanModal, setShowUnbanModal] = useState(false);
  const [selectedBanToRevoke, setSelectedBanToRevoke] = useState(null);
  const [newSplitName, setNewSplitName] = useState("");
  const [newSplitChampId, setNewSplitChampId] = useState("");
  const [newSplitFormat, setNewSplitFormat] = useState("cxc");
  const [editingSplitId, setEditingSplitId] = useState(null);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [newChampName, setNewChampName] = useState("");
  const [newChampIcon, setNewChampIcon] = useState("");
  const [editingChampId, setEditingChampId] = useState(null);
  const [newMapName, setNewMapName] = useState("");
  const [newClanName, setNewClanName] = useState("");
  const [newClanTag, setNewClanTag] = useState("");
  const [newClanLogo, setNewClanLogo] = useState("");
  const [editingClanId, setEditingClanId] = useState(null);
  const [managingMembersClanId, setManagingMembersClanId] = useState(null);
  const [selectedPlayerToAdd, setSelectedPlayerToAdd] = useState("");
  const [settingsForm, setSettingsForm] = useState(
    data.settings || DEFAULT_SETTINGS
  );

  const [marketSelectedPlayer, setMarketSelectedPlayer] = useState("");
  const [marketTargetClan, setMarketTargetClan] = useState("");
  const [marketPriceOverride, setMarketPriceOverride] = useState("");
  const [isFriendlyAgreement, setIsFriendlyAgreement] = useState(false);
  const [manageContractPlayerId, setManageContractPlayerId] = useState(null);
  const [treasuryClanId, setTreasuryClanId] = useState(null);
  const [softResetPercent, setSoftResetPercent] = useState("20");
  const [reopenDate, setReopenDate] = useState(
    data.settings?.marketReopenDate || ""
  );
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const triggerFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 3000);
  };
  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };
  const handleDragEnter = (index) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    const newOrder = [...data.adminMenuOrder];
    const draggedItem = newOrder[draggedItemIndex];
    newOrder.splice(draggedItemIndex, 1);
    newOrder.splice(index, 0, draggedItem);
    onMenuOrderChange(newOrder);
    setDraggedItemIndex(index);
  };
  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };
  const handleImageUpload = (e, setter) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const openBanModal = (player) => {
    setSelectedPlayerToBan(player);
    setBanReason("");
    setBanDuration("permanent");
    setShowBanModal(true);
  };
  const handleConfirmBan = () => {
    if (!selectedPlayerToBan || !banReason) {
      alert("Informe um motivo.");
      return;
    }
    onBanPlayer(selectedPlayerToBan.id, banReason, banDuration);
    setShowBanModal(false);
    setSelectedPlayerToBan(null);
  };
  const openUnbanModal = (ban) => {
    setSelectedBanToRevoke(ban);
    setShowUnbanModal(true);
  };
  const handleConfirmUnban = () => {
    if (selectedBanToRevoke) {
      onUnbanPlayer(selectedBanToRevoke.id);
      triggerFeedback(`Banimento revogado.`);
      setShowUnbanModal(false);
      setSelectedBanToRevoke(null);
    }
  };

  const handlePlayerSelect = (playerId) => {
    setMarketSelectedPlayer(playerId);
    setIsFriendlyAgreement(false);
    const player = data.players.find((p) => p.id === playerId);
    if (player) {
      const status = getContractStatus(player);
      if (status.isValid) {
        const penalty = calculateReleaseClause(
          player.marketValue || 10000000,
          player.releaseClauseMultiplier
        );
        setMarketPriceOverride((player.marketValue || 10000000) + penalty);
      } else {
        setMarketPriceOverride(player.marketValue || 10000000);
      }
    } else {
      setMarketPriceOverride("");
    }
  };

  const selectedMarketPlayerObj = data.players.find(
    (p) => p.id === marketSelectedPlayer
  );
  const selectedPlayerContract = selectedMarketPlayerObj
    ? getContractStatus(selectedMarketPlayerObj)
    : null;
  const isHostilePossible =
    selectedPlayerContract &&
    selectedPlayerContract.isValid &&
    selectedMarketPlayerObj.clanId;

  return (
    <div className="min-h-screen bg-slate-950 p-8 pt-28 font-sans text-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-3xl font-black text-white uppercase flex items-center gap-3 tracking-tight drop-shadow-lg">
            <div className="p-2 bg-slate-900 border border-slate-700 rounded-lg">
              <Lock className="text-amber-400" size={24} />
            </div>
            Admin Console
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={onHome}
              className="text-slate-400 hover:text-white flex items-center gap-2 font-bold uppercase text-xs border border-slate-800 px-5 py-2.5 rounded-lg hover:bg-slate-900 transition-all hover:border-slate-600"
            >
              <Home size={16} /> Voltar ao Site
            </button>
            <button
              onClick={onLogout}
              className="text-red-400 hover:text-red-300 flex items-center gap-2 font-bold uppercase text-xs border border-red-500/20 px-5 py-2.5 rounded-lg hover:bg-red-500/10 transition-all hover:border-red-500/40"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>

        {treasuryClanId && (
          <TreasuryModal
            clan={data.clans.find((c) => c.id === treasuryClanId)}
            logs={data.financialLogs}
            onClose={() => setTreasuryClanId(null)}
            onUpdateFinancials={(id, bal, res, type) => {
              onUpdateClanFinancials(id, bal, res, type);
              setTreasuryClanId(null);
              triggerFeedback("Caixa atualizado!");
            }}
          />
        )}
        {manageContractPlayerId && (
          <ContractModal
            player={data.players.find((p) => p.id === manageContractPlayerId)}
            onClose={() => setManageContractPlayerId(null)}
            onUpdateContract={(id, date, mult) => {
              onUpdateContract(id, date, mult);
              setManageContractPlayerId(null);
              triggerFeedback("Contrato atualizado com sucesso!");
            }}
          />
        )}

        {activeMD3Series && (
          <TournamentMD3Modal
            series={activeMD3Series}
            data={data}
            onClose={() => setActiveMD3Series(null)}
            onSaveMatch={onSaveMatch}
            onDeleteMatch={onDeleteMatch}
            onUpdateSeries={(id, updates) => {
              onUpdateSeries(id, updates);
              const updatedSeries = { ...activeMD3Series, ...updates };
              setActiveMD3Series(updatedSeries);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            {data.adminMenuOrder.map((menuId, index) => {
              const menuItem = ADMIN_MENU_CONFIG[menuId];
              if (!menuItem) return null;
              return (
                <DraggableMenuItem
                  key={menuId}
                  id={menuId}
                  index={index}
                  label={menuItem.label}
                  icon={menuItem.icon}
                  isActive={activeTab === menuId}
                  onClick={() => setActiveTab(menuId)}
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  onDragEnd={handleDragEnd}
                />
              );
            })}
          </div>

          <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
            {feedback && (
              <div className="border p-4 rounded-xl mb-8 flex items-center gap-3 text-sm animate-fadeIn shadow-lg bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                <CheckCircle size={18} />{" "}
                <span className="font-bold">{feedback}</span>
              </div>
            )}

            {/* --- CENTRAL DO TORNEIO (UI DE DASHBOARD E DESFAZER) --- */}
            {activeTab === "tournament" && (
              <div className="animate-fadeIn space-y-8">
                <h3 className="text-xl font-black text-white border-b border-slate-800 pb-4 tracking-tight flex items-center gap-3">
                  <Trophy className="text-amber-500" size={24} /> Central do
                  Torneio
                </h3>

                {/* PASSO 1 */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                      1
                    </div>
                    <h4 className="text-white font-bold uppercase tracking-tight">
                      Competição Ativa
                    </h4>
                  </div>
                  <select
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-white text-sm outline-none focus:border-amber-400 font-bold"
                    value={selectedSplitId}
                    onChange={(e) => setSelectedSplitId(e.target.value)}
                  >
                    <option value="">
                      Selecione um Split para gerenciar...
                    </option>
                    {data.splits.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} {s.isActive ? "(Em Andamento)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSplitId &&
                  (() => {
                    const currentSplit = data.splits.find(
                      (s) => s.id === selectedSplitId
                    );
                    const enrolledClans = currentSplit?.enrolledClans || [];
                    const backend = new BackendController(data);
                    const splitSeries = data.series.filter(
                      (s) => s.splitId === selectedSplitId
                    );
                    const groupStageSeries = splitSeries.filter(
                      (s) => s.stage === "Fase de Grupos"
                    );
                    const playoffSeries = splitSeries.filter(
                      (s) => s.stage === "Playoffs"
                    );

                    const hasGroups = groupStageSeries.length > 0;
                    const hasPlayoffs = playoffSeries.length > 0;

                    return (
                      <>
                        {/* INTERFACE DINÂMICA: CxC vs MIX */}
                        {currentSplit.format === "cxc" ? (
                          <>
                            {/* PASSO 2: Inscrição (Apenas CxC) */}
                            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden mb-6">
                              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                                <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black flex items-center justify-center text-sm">
                                    2
                                  </div>
                                  <h4 className="text-white font-bold uppercase tracking-tight">
                                    Inscrição de Equipes
                                  </h4>
                                </div>
                                <span className="text-amber-500 font-bold bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-lg text-xs uppercase">
                                  {enrolledClans.length} Equipes Inscritas
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {data.clans.map((clan) => {
                                  const isEnrolled = enrolledClans.includes(
                                    clan.id
                                  );
                                  return (
                                    <button
                                      key={clan.id}
                                      disabled={hasGroups}
                                      onClick={() =>
                                        onToggleClanEnrollment(
                                          selectedSplitId,
                                          clan.id
                                        )
                                      }
                                      className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                                        isEnrolled
                                          ? "bg-amber-500/10 border-amber-500/50 shadow-md scale-[1.02]"
                                          : "bg-slate-900 border-slate-800 hover:border-slate-600 grayscale opacity-60"
                                      }`}
                                    >
                                      <img
                                        src={clan.logoUrl}
                                        className="w-10 h-10 object-contain"
                                      />
                                      <span
                                        className={`text-xs font-bold uppercase tracking-tight text-center ${
                                          isEnrolled
                                            ? "text-white"
                                            : "text-slate-500"
                                        }`}
                                      >
                                        {clan.tag}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                              {hasGroups && (
                                <div className="mt-4 text-[10px] text-amber-500 flex items-center gap-1.5">
                                  <Lock size={12} /> Inscrições travadas (Fase
                                  de Grupos já foi gerada).
                                </div>
                              )}
                            </div>

                            {/* PASSO 3: Fase de Grupos */}
                            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden mb-6">
                              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/50">
                                <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black flex items-center justify-center text-sm">
                                    3
                                  </div>
                                  <h4 className="text-white font-bold uppercase tracking-tight">
                                    Fase de Grupos
                                  </h4>
                                </div>
                                {!hasGroups ? (
                                  <button
                                    onClick={() => {
                                      onGenerateGroupStage(selectedSplitId);
                                      triggerFeedback(
                                        "Calendário gerado com sucesso!"
                                      );
                                    }}
                                    className="bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase px-6 py-2.5 rounded-lg transition-all shadow-lg flex items-center gap-2"
                                  >
                                    <Calendar size={14} /> Gerar Calendário
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      onUndoGroupStage(selectedSplitId);
                                      triggerFeedback(
                                        "Fase de Grupos desfeita."
                                      );
                                    }}
                                    className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold uppercase px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                  >
                                    <Trash2 size={14} /> Desfazer Grupos
                                  </button>
                                )}
                              </div>
                              {hasGroups && (
                                <div className="space-y-3">
                                  {groupStageSeries.map((series, index) => {
                                    const sData =
                                      backend.getSeriesStatus(series);
                                    const clanA = data.clans.find(
                                      (c) => c.id === series.clanA_Id
                                    );
                                    const clanB = data.clans.find(
                                      (c) => c.id === series.clanB_Id
                                    );
                                    return (
                                      <div
                                        key={series.id}
                                        className="p-4 rounded-xl border border-slate-800 bg-slate-900 flex justify-between items-center"
                                      >
                                        <div className="flex items-center gap-4">
                                          <span className="text-slate-500 font-mono text-[10px]">
                                            #{index + 1}
                                          </span>
                                          <span className="text-white font-bold text-xs uppercase">
                                            {clanA?.tag} vs {clanB?.tag}
                                          </span>
                                        </div>
                                        <button
                                          onClick={() =>
                                            setActiveMD3Series(series)
                                          }
                                          className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg font-bold text-[10px] uppercase transition-all"
                                        >
                                          Jogar MD3
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* PASSO 4: Playoffs */}
                            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black flex items-center justify-center text-sm">
                                    4
                                  </div>
                                  <h4 className="text-white font-bold uppercase tracking-tight">
                                    Playoffs (Mata-Mata)
                                  </h4>
                                </div>
                                {!hasPlayoffs ? (
                                  <button
                                    onClick={() =>
                                      onGeneratePlayoffs(selectedSplitId)
                                    }
                                    disabled={!hasGroups}
                                    className="bg-amber-400 text-black text-xs font-black uppercase px-6 py-2.5 rounded-lg disabled:opacity-50"
                                  >
                                    Gerar Chaveamento
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      onUndoPlayoffs(selectedSplitId)
                                    }
                                    className="text-red-500 text-xs font-bold uppercase"
                                  >
                                    Desfazer Playoffs
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          /* MODO MIX: PAINEL DE CONVOCAÇÃO */
                          <div className="animate-fadeIn space-y-6">
                            <div className="bg-slate-950 p-8 rounded-3xl border border-blue-500/30 shadow-2xl relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-slate-800">
                                <div>
                                  <h4 className="text-white font-black uppercase text-xl flex items-center gap-3">
                                    <Users className="text-blue-400" />{" "}
                                    Convocação para o Mix
                                  </h4>
                                  <p className="text-slate-500 text-sm mt-1">
                                    Selecione os atletas presentes. O sistema
                                    cuidará do equilíbrio.
                                  </p>
                                </div>
                                <div className="flex gap-4">
                                  <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-center">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">
                                      Inscritos
                                    </div>
                                    <div className="text-xl font-mono font-black text-blue-400">
                                      {selectedPlayersForMix.length}
                                    </div>
                                  </div>
                                  <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-center">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">
                                      Times
                                    </div>
                                    <div className="text-xl font-mono font-black text-white">
                                      {Math.floor(
                                        selectedPlayersForMix.length / 5
                                      )}
                                    </div>
                                  </div>
                                  <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-center">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">
                                      Reservas
                                    </div>
                                    <div className="text-xl font-mono font-black text-amber-500">
                                      {selectedPlayersForMix.length % 5}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Grid de Seleção */}
                              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                                {data.players.map((p) => {
                                  const isSelected =
                                    selectedPlayersForMix.includes(p.id);
                                  return (
                                    <button
                                      key={p.id}
                                      onClick={() =>
                                        setSelectedPlayersForMix((prev) =>
                                          isSelected
                                            ? prev.filter((id) => id !== p.id)
                                            : [...prev, p.id]
                                        )
                                      }
                                      className={`relative group flex flex-col items-center p-2 rounded-xl border transition-all ${
                                        isSelected
                                          ? "bg-blue-500/20 border-blue-500 shadow-lg scale-105"
                                          : "bg-slate-900 border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100"
                                      }`}
                                    >
                                      <img
                                        src={p.avatarUrl}
                                        className="w-12 h-12 rounded-lg mb-2 object-cover"
                                        alt={p.nickname}
                                      />
                                      <span className="text-[10px] font-bold text-white truncate w-full text-center">
                                        {p.nickname}
                                      </span>
                                      {isSelected && (
                                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-md">
                                          <Check size={10} />
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* RELATÓRIO DE PRECISÃO */}
                              {mixSummary && (
                                <div className="mb-6 p-6 bg-slate-900 border border-blue-500/30 rounded-2xl animate-fadeIn">
                                  <div className="flex justify-between items-center mb-4">
                                    <h5 className="text-blue-400 font-bold uppercase text-[10px] tracking-widest">
                                      Relatório de Equilíbrio
                                    </h5>
                                    <div className="text-right">
                                      <span className="text-slate-500 text-[9px] uppercase font-bold block">
                                        Precisão
                                      </span>
                                      <span className="text-xl font-black text-emerald-400">
                                        {mixSummary.precision}%
                                      </span>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {mixSummary.teams.map((t) => (
                                      <div
                                        key={t.name}
                                        className="bg-slate-950 p-3 rounded-xl border border-slate-800"
                                      >
                                        <div className="text-white font-bold text-[10px] uppercase mb-1">
                                          {t.name}
                                        </div>
                                        <div className="text-lg font-mono font-black text-blue-400">
                                          {t.avgKD}{" "}
                                          <span className="text-[8px] text-slate-600 ml-1">
                                            AVG KD
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <button
                                disabled={selectedPlayersForMix.length < 10}
                                onClick={() => {
                                  const result = onGenerateMixTournament(
                                    selectedSplitId,
                                    selectedPlayersForMix
                                  );
                                  setMixSummary(result); // Esta linha guarda os dados de precisão
                                  setSelectedPlayersForMix([]);
                                  triggerFeedback(
                                    "Torneio MIX gerado e balanceado!"
                                  );
                                }}
                                className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black uppercase py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3"
                              >
                                <Zap size={20} /> Balancear Equipes e Gerar
                                Chaves
                              </button>
                              {selectedPlayersForMix.length < 10 && (
                                <p className="text-center text-slate-600 text-[10px] mt-4 uppercase font-bold tracking-widest animate-pulse">
                                  Aguardando mínimo de 10 jogadores...
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* PASSO 4 */}
                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/50">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                                4
                              </div>
                              <h4 className="text-white font-bold uppercase tracking-tight">
                                Playoffs (Mata-Mata)
                              </h4>
                            </div>
                            {!hasPlayoffs ? (
                              <button
                                onClick={() => {
                                  onGeneratePlayoffs(selectedSplitId);
                                  triggerFeedback("Chaveamento gerado!");
                                }}
                                disabled={!hasGroups}
                                className="bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-black uppercase px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2"
                              >
                                <Trophy size={14} /> Gerar Chaveamento Top 4
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  onUndoPlayoffs(selectedSplitId);
                                  triggerFeedback("Playoffs desfeitos.");
                                }}
                                className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold uppercase px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                              >
                                <Trash2 size={14} /> Desfazer Playoffs
                              </button>
                            )}
                          </div>

                          {hasPlayoffs ? (
                            <div className="space-y-3">
                              {playoffSeries.map((series) => {
                                const sData = backend.getSeriesStatus(series);
                                const isFinished =
                                  sData.status === "Finalizada";
                                const clanA = data.clans.find(
                                  (c) => c.id === series.clanA_Id
                                );
                                const clanB = data.clans.find(
                                  (c) => c.id === series.clanB_Id
                                );
                                return (
                                  <div
                                    key={series.id}
                                    className={`p-4 rounded-xl border flex flex-col xl:flex-row justify-between xl:items-center gap-4 transition-all ${
                                      isFinished
                                        ? "bg-slate-900/50 border-slate-800 opacity-80"
                                        : "bg-slate-900 border-slate-700 hover:border-amber-500/30 shadow-lg"
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 sm:gap-6 flex-1 w-full justify-between xl:justify-start">
                                      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold uppercase tracking-wider px-2 py-1.5 rounded-lg text-[8px] sm:text-[10px] text-center w-16 sm:w-24 shrink-0 truncate">
                                        {series.label}
                                      </div>
                                      <div className="flex items-center justify-end gap-2 sm:gap-3 w-16 sm:w-28">
                                        <span
                                          className={`font-bold text-[9px] sm:text-sm uppercase tracking-tight truncate ${
                                            sData.winsA > sData.winsB
                                              ? "text-white"
                                              : "text-slate-400"
                                          }`}
                                        >
                                          {clanA ? clanA.tag : series.teamA}
                                        </span>
                                        {clanA?.logoUrl ? (
                                          <img
                                            src={clanA.logoUrl}
                                            className="w-5 h-5 sm:w-8 sm:h-8 object-contain drop-shadow-md"
                                          />
                                        ) : (
                                          <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                                            ?
                                          </div>
                                        )}
                                      </div>
                                      <div className="font-mono text-sm sm:text-xl font-black bg-slate-950 px-2 sm:px-4 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2 sm:gap-3 shadow-inner shrink-0">
                                        <span
                                          className={
                                            sData.winsA > sData.winsB
                                              ? "text-blue-400"
                                              : "text-slate-500"
                                          }
                                        >
                                          {sData.winsA}
                                        </span>
                                        <span className="text-slate-700 text-xs sm:text-sm">
                                          x
                                        </span>
                                        <span
                                          className={
                                            sData.winsB > sData.winsA
                                              ? "text-red-400"
                                              : "text-slate-500"
                                          }
                                        >
                                          {sData.winsB}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-start gap-2 sm:gap-3 w-16 sm:w-28">
                                        {clanB?.logoUrl ? (
                                          <img
                                            src={clanB.logoUrl}
                                            className="w-5 h-5 sm:w-8 sm:h-8 object-contain drop-shadow-md"
                                          />
                                        ) : (
                                          <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                                            ?
                                          </div>
                                        )}
                                        <span
                                          className={`font-bold text-[9px] sm:text-sm uppercase tracking-tight truncate ${
                                            sData.winsB > sData.winsA
                                              ? "text-white"
                                              : "text-slate-400"
                                          }`}
                                        >
                                          {clanB ? clanB.tag : series.teamB}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full xl:w-auto mt-2 xl:mt-0 border-t border-slate-800/50 xl:border-none pt-3 xl:pt-0">
                                      <button
                                        onClick={() =>
                                          setActiveMD3Series(series)
                                        }
                                        className={`w-full xl:w-auto px-6 py-2.5 rounded-lg text-xs font-bold uppercase transition-all shadow-lg flex items-center justify-center gap-2 ${
                                          isFinished
                                            ? "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
                                            : "bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20"
                                        }`}
                                      >
                                        <Play size={14} />{" "}
                                        {isFinished
                                          ? "Ver Resultado"
                                          : "Jogar MD3"}
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-10 bg-slate-900 border border-dashed border-slate-800 rounded-xl text-slate-500">
                              {hasGroups
                                ? "Fase de Grupos em andamento. Ao finalizar, gere os Playoffs."
                                : "Gere a Fase de Grupos primeiro."}
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })()}
              </div>
            )}

            {/* ABA DE MERCADO E O RESTANTE SEGUEM INTACTOS */}
            {activeTab === "market" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Mercado da Bala & Contratos
                </h3>

                {/* PAINEL DE CONTROLE DA JANELA COM CALENDÁRIO */}
                <div
                  className={`p-6 rounded-2xl border mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl transition-colors ${
                    data.settings?.marketStatus === "closed"
                      ? "bg-red-500/5 border-red-500/30"
                      : "bg-emerald-500/5 border-emerald-500/30"
                  }`}
                >
                  <div>
                    <h4
                      className={`font-black text-lg uppercase tracking-tight flex items-center gap-2 ${
                        data.settings?.marketStatus === "closed"
                          ? "text-red-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {data.settings?.marketStatus === "closed" ? (
                        <Lock size={20} />
                      ) : (
                        <ShoppingBag size={20} />
                      )}
                      {data.settings?.marketStatus === "closed"
                        ? "Janela Fechada"
                        : "Janela Aberta"}
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">
                      {data.settings?.marketStatus === "closed"
                        ? "O Scout público está bloqueado. Transferências oficiais pausadas para o público."
                        : "O mercado está livre. A comunidade pode acessar o Scout e ver transações."}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                    {data.settings?.marketStatus !== "closed" && (
                      <div className="flex flex-col w-full md:w-auto">
                        <label className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">
                          Data de Reabertura (Opcional)
                        </label>
                        <input
                          type="datetime-local"
                          className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400 transition-colors w-full"
                          value={reopenDate}
                          onChange={(e) => setReopenDate(e.target.value)}
                        />
                      </div>
                    )}
                    <button
                      onClick={() => {
                        onToggleMarketStatus(reopenDate);
                        triggerFeedback("Status da janela alterado!");
                      }}
                      className={`w-full md:w-auto shrink-0 px-6 py-3 md:mt-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg ${
                        data.settings?.marketStatus === "closed"
                          ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20"
                          : "bg-red-500 hover:bg-red-400 text-white shadow-red-500/20"
                      }`}
                    >
                      {data.settings?.marketStatus === "closed"
                        ? "Reabrir Mercado"
                        : "Fechar Janela"}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-lg mb-8">
                  <h4 className="text-amber-400 font-bold text-xs uppercase mb-6 flex items-center gap-2 tracking-widest">
                    <DollarSign size={14} /> Executar Transação
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                        Jogador
                      </label>
                      <select
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors"
                        value={marketSelectedPlayer}
                        onChange={(e) => handlePlayerSelect(e.target.value)}
                      >
                        <option value="">Selecione o Atleta...</option>
                        {data.players
                          .filter((p) => !p.isPaused)
                          .map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.nickname} (
                              {p.clanId
                                ? data.clans.find((c) => c.id === p.clanId)?.tag
                                : "Free Agent"}
                              )
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                        Clã Comprador
                      </label>
                      <select
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors"
                        value={marketTargetClan}
                        onChange={(e) => setMarketTargetClan(e.target.value)}
                      >
                        <option value="">Selecione o Clã...</option>
                        {data.clans.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} (Caixa: {formatCurrency(c.budget)})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                        Valor da Transação{" "}
                        {isHostilePossible && !isFriendlyAgreement && (
                          <span className="text-red-400 animate-pulse ml-1">
                            (Multa)
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        className={`w-full bg-slate-900 border rounded-lg p-3.5 text-white text-sm outline-none transition-colors font-mono ${
                          isHostilePossible && !isFriendlyAgreement
                            ? "border-red-500/50 focus:border-red-500 text-red-400"
                            : "border-slate-700 focus:border-amber-400"
                        }`}
                        value={marketPriceOverride}
                        onChange={(e) => setMarketPriceOverride(e.target.value)}
                        disabled={isHostilePossible && !isFriendlyAgreement}
                      />
                    </div>
                  </div>
                  {isHostilePossible && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="text-red-400" size={20} />
                        <div>
                          <div className="text-red-400 font-bold text-sm">
                            Jogador Blindado pelo Clã Atual
                          </div>
                          <div className="text-slate-400 text-xs">
                            A compra forçada ativará a multa rescisória e será
                            taxada como <strong>Compra Hostil</strong>.
                          </div>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors">
                        <input
                          type="checkbox"
                          className="accent-amber-500"
                          checked={isFriendlyAgreement}
                          onChange={(e) =>
                            setIsFriendlyAgreement(e.target.checked)
                          }
                        />
                        <span className="text-slate-300 text-xs font-bold uppercase">
                          Acordo Amigável
                        </span>
                      </label>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (
                        marketSelectedPlayer &&
                        marketTargetClan &&
                        marketPriceOverride !== ""
                      ) {
                        const player = data.players.find(
                          (p) => p.id === marketSelectedPlayer
                        );
                        const targetClan = data.clans.find(
                          (c) => c.id === marketTargetClan
                        );
                        const price = parseFloat(marketPriceOverride);

                        if (player.clanId === marketTargetClan) {
                          setFeedback("Erro: Jogador já está neste clã.");
                          return;
                        }

                        // NOVO: Trava de Segurança Financeira (Bloqueia se não tiver caixa)
                        if (targetClan.budget < price) {
                          setFeedback(
                            `Erro: Caixa insuficiente! O clã possui apenas ${formatCurrency(
                              targetClan.budget
                            )}.`
                          );
                          return;
                        }
                        const isHostile =
                          isHostilePossible && !isFriendlyAgreement;
                        onTransferPlayer(
                          player.id,
                          marketTargetClan,
                          price,
                          isHostile
                        );
                        triggerFeedback(
                          isHostile
                            ? `💥 Compra Hostil de ${player.nickname} realizada!`
                            : `Transferência de ${player.nickname} realizada!`
                        );
                        setMarketSelectedPlayer("");
                        setMarketTargetClan("");
                        setMarketPriceOverride("");
                        setIsFriendlyAgreement(false);
                      } else {
                        setFeedback("Preencha os dados da negociação.");
                      }
                    }}
                    className={`w-full font-bold uppercase py-4 rounded-lg text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                      isHostilePossible && !isFriendlyAgreement
                        ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/20"
                        : "bg-green-500 hover:bg-green-400 text-black shadow-green-500/20"
                    }`}
                  >
                    {isHostilePossible && !isFriendlyAgreement ? (
                      <>
                        <Zap size={18} /> Executar Compra Hostil
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} /> Confirmar Compra
                      </>
                    )}
                  </button>
                </div>

                {/* PAINEL DE SOFT RESET (VIRADA DE TEMPORADA) */}
                <div className="bg-slate-950 p-8 rounded-2xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)] mb-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                    <div>
                      <h4 className="text-red-400 font-bold text-xs uppercase flex items-center gap-2 tracking-widest mb-1">
                        <Activity size={14} /> Soft Reset (Virada de Temporada)
                      </h4>
                      <p className="text-slate-500 text-[10px]">
                        Desvaloriza o passe de TODOS os jogadores da liga na
                        porcentagem definida. Ideal para o fim do Split.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-1/3 relative">
                      <input
                        type="number"
                        min="1"
                        max="99"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-lg font-mono font-black outline-none focus:border-red-500 text-center"
                        value={softResetPercent}
                        onChange={(e) => setSoftResetPercent(e.target.value)}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                        %
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `ATENÇÃO: Você está prestes a desvalorizar o mercado INTEIRO em ${softResetPercent}%. Esta ação não pode ser desfeita. Confirmar?`
                          )
                        ) {
                          onApplySoftReset(parseFloat(softResetPercent));
                          triggerFeedback(
                            `Mercado desvalorizado em ${softResetPercent}%!`
                          );
                          setSoftResetPercent("20");
                        }
                      }}
                      className="w-full sm:w-2/3 bg-red-600 hover:bg-red-500 text-white font-black uppercase py-4 rounded-lg text-sm transition-all shadow-lg shadow-red-600/20 flex justify-center items-center gap-2"
                    >
                      <TrendingUp size={18} className="rotate-180" /> Aplicar
                      Queda no Mercado
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                      <FileText size={16} /> Gestão de Contratos
                    </h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                      {data.players
                        .filter((p) => p.clanId && !p.isPaused)
                        .map((p) => {
                          const status = getContractStatus(p);
                          return (
                            <div
                              key={p.id}
                              className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center group"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.avatarUrl}
                                  className="w-8 h-8 rounded-md bg-slate-900 object-cover"
                                />
                                <div>
                                  <span className="text-white font-bold text-xs">
                                    {p.nickname}
                                  </span>
                                  <div
                                    className={`text-[9px] uppercase font-bold tracking-wider mt-0.5 ${status.color}`}
                                  >
                                    {status.status}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => setManageContractPlayerId(p.id)}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-amber-400 hover:text-black text-slate-400 text-[10px] font-bold uppercase rounded border border-slate-700 transition-all"
                              >
                                Renovar
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                      <Banknote size={16} /> Clãs & Finanças
                    </h4>
                    <div className="space-y-3">
                      {data.clans.map((c) => (
                        <div
                          key={c.id}
                          className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={c.logoUrl}
                              className="w-8 h-8 object-contain"
                            />
                            <span className="text-white font-bold text-xs">
                              {c.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div
                              className={`${
                                c.budget < 0
                                  ? "text-red-400"
                                  : "text-emerald-400"
                              } font-mono font-bold text-sm`}
                            >
                              {formatCurrency(c.budget)}
                            </div>
                            <button
                              onClick={() => setTreasuryClanId(c.id)}
                              className="p-2 text-slate-500 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
                            >
                              <Landmark size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "clans" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Gerenciar Clãs
                </h3>
                <div
                  className={`bg-slate-950 p-8 rounded-2xl border mb-10 transition-colors ${
                    editingClanId
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h4
                      className={`${
                        editingClanId ? "text-blue-400" : "text-amber-400"
                      } font-bold text-xs uppercase flex items-center gap-2 tracking-widest`}
                    >
                      {editingClanId ? (
                        <>
                          <Pencil size={14} /> Editando Clã
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Novo Clã
                        </>
                      )}
                    </h4>
                    {editingClanId && (
                      <button
                        onClick={() => {
                          setNewClanName("");
                          setNewClanTag("");
                          setNewClanLogo("");
                          setEditingClanId(null);
                        }}
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 text-[10px] uppercase font-bold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                      >
                        <X size={12} /> Cancelar
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                        Nome do Clã
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Pain Gaming"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors"
                        value={newClanName}
                        onChange={(e) => setNewClanName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                        TAG (3-4 Letras)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: PNG"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors uppercase font-mono"
                        maxLength={5}
                        value={newClanTag}
                        onChange={(e) =>
                          setNewClanTag(e.target.value.toUpperCase())
                        }
                      />
                    </div>
                  </div>
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 border-dashed mb-6">
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-4 tracking-wider">
                      Logo do Clã
                    </label>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-3 px-6 rounded-lg border border-slate-600 transition-colors flex items-center gap-2 shadow-lg">
                        <Upload size={16} /> Escolher Arquivo{" "}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, setNewClanLogo)}
                        />
                      </label>
                    </div>
                    {newClanLogo && (
                      <div className="mt-6 relative w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-800 p-2 flex items-center justify-center group">
                        <img
                          src={newClanLogo}
                          className="max-w-full max-h-full object-contain"
                          alt="Preview"
                        />
                        <button
                          onClick={() => setNewClanLogo("")}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (newClanName && newClanTag && newClanLogo) {
                        if (editingClanId) {
                          onUpdateClan(editingClanId, {
                            name: newClanName,
                            tag: newClanTag,
                            logoUrl: newClanLogo,
                          });
                          triggerFeedback("Clã atualizado com sucesso!");
                        } else {
                          onAddClan({
                            name: newClanName,
                            tag: newClanTag,
                            logoUrl: newClanLogo,
                            budget: 150000000,
                          });
                          triggerFeedback("Clã criado com sucesso!");
                        }
                        setNewClanName("");
                        setNewClanTag("");
                        setNewClanLogo("");
                        setEditingClanId(null);
                      }
                    }}
                    className={`font-bold uppercase w-full py-4 rounded-lg text-sm transition-all shadow-lg ${
                      editingClanId
                        ? "bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/20"
                        : "bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20"
                    }`}
                  >
                    {editingClanId ? "Salvar Alterações" : "Criar Clã"}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {data.clans?.map((clan) => {
                    const memberCount = data.players.filter(
                      (p) => p.clanId === clan.id
                    ).length;
                    return (
                      <div
                        key={clan.id}
                        className={`bg-slate-950 p-5 rounded-xl border flex items-center justify-between transition-all hover:scale-[1.01] hover:shadow-lg ${
                          editingClanId === clan.id
                            ? "border-blue-500/50 bg-blue-900/10"
                            : "border-slate-800 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-slate-900 rounded-xl p-2.5 border border-slate-800 flex items-center justify-center">
                            <img
                              src={clan.logoUrl}
                              alt={clan.tag}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold text-base">
                                {clan.name}
                              </span>
                              <span className="text-amber-500 text-[10px] font-bold border border-amber-500/30 px-1.5 py-0.5 rounded bg-amber-500/5 tracking-wider">
                                [{clan.tag}]
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 font-medium">
                              <Users size={12} /> {memberCount} Membro(s)
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setManagingMembersClanId(clan.id)}
                            className="text-slate-500 hover:text-white hover:bg-slate-800 p-2.5 rounded-lg transition-colors"
                            title="Gerenciar Membros"
                          >
                            <Users size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setNewClanName(clan.name);
                              setNewClanTag(clan.tag);
                              setNewClanLogo(clan.logoUrl);
                              setEditingClanId(clan.id);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 p-2.5 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => {
                              onDeleteClan(clan.id);
                              triggerFeedback("Clã excluído!");
                            }}
                            className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 p-2.5 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {activeTab === "splits" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Gerenciar Splits
                </h3>
                <div
                  className={`bg-slate-950 p-8 rounded-2xl border mb-10 transition-colors ${
                    editingSplitId
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h4
                      className={`${
                        editingSplitId ? "text-blue-400" : "text-amber-400"
                      } font-bold text-xs uppercase flex items-center gap-2 tracking-widest`}
                    >
                      {editingSplitId ? (
                        <>
                          <Pencil size={14} /> Editando Split
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Novo Split
                        </>
                      )}
                    </h4>
                    {editingSplitId && (
                      <button
                        onClick={() => {
                          setNewSplitName("");
                          setNewSplitChampId("");
                          setEditingSplitId(null);
                        }}
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 text-[10px] uppercase font-bold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                      >
                        <X size={12} /> Cancelar
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                        Nome do Split
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Split 2 - Inverno"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors"
                        value={newSplitName}
                        onChange={(e) => setNewSplitName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                        Campeonato Associado
                      </label>
                      <select
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors"
                        value={newSplitChampId}
                        onChange={(e) => setNewSplitChampId(e.target.value)}
                      >
                        <option value="">Selecione...</option>
                        {data.championships.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>{" "}
                  <div className="md:col-span-2 mt-4">
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                      Formato da Competição
                    </label>
                    <div className="flex bg-slate-900 rounded-lg border border-slate-700 p-1">
                      <button
                        type="button"
                        onClick={() => setNewSplitFormat("cxc")}
                        className={`flex-1 py-3 text-[10px] font-bold uppercase rounded-md transition-all ${
                          newSplitFormat === "cxc"
                            ? "bg-amber-400 text-black shadow-lg"
                            : "text-slate-500 hover:text-white"
                        }`}
                      >
                        Clã vs Clã (Com Salário)
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewSplitFormat("mix")}
                        className={`flex-1 py-3 text-[10px] font-bold uppercase rounded-md transition-all ${
                          newSplitFormat === "mix"
                            ? "bg-blue-500 text-white shadow-lg"
                            : "text-slate-500 hover:text-white"
                        }`}
                      >
                        MIX (Sem Salário)
                      </button>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-2 italic">
                      * O formato CxC automatiza cobranças de salário dos clãs.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (newSplitName && newSplitChampId) {
                        if (editingSplitId) {
                          onUpdateSplit(editingSplitId, {
                            name: newSplitName,
                            championshipId: newSplitChampId,
                            format: newSplitFormat,
                          });
                          triggerFeedback("Split atualizado!");
                          setEditingSplitId(null);
                        } else {
                          onAddSplit(
                            newSplitName,
                            newSplitChampId,
                            newSplitFormat
                          );
                          triggerFeedback("Novo Split iniciado!");
                        }
                        setNewSplitName("");
                        setNewSplitChampId("");
                      }
                    }}
                    className={`font-bold uppercase w-full py-4 rounded-lg text-sm transition-all shadow-lg ${
                      editingSplitId
                        ? "bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/20"
                        : "bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20"
                    }`}
                  >
                    {editingSplitId
                      ? "Salvar Alterações"
                      : "Iniciar Novo Split"}
                  </button>
                </div>
                <div className="space-y-4">
                  {data.splits.map((s) => (
                    <div
                      key={s.id}
                      className={`p-5 rounded-xl border flex justify-between items-center transition-all ${
                        s.isActive
                          ? "bg-amber-500/10 border-amber-500/30 shadow-lg shadow-amber-500/5"
                          : "bg-slate-950 border-slate-800 opacity-60"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold text-sm">
                            {s.name}
                          </span>
                          <span className="text-[10px] border border-slate-700 px-2 py-0.5 rounded uppercase text-slate-400 font-bold">
                            {s.format === "cxc" ? "CxC" : "MIX"}
                          </span>
                          {s.isActive && (
                            <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded font-black uppercase tracking-wider">
                              Ativo
                            </span>
                          )}
                        </div>
                        <div className="text-slate-500 text-xs mt-1.5 flex items-center gap-2">
                          <Calendar size={12} /> Início: {s.startDate}{" "}
                          {s.endDate && `• Fim: ${s.endDate}`}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {s.isActive && (
                          <button
                            onClick={() => {
                              onEndSplit(s.id);
                              triggerFeedback("🏆 Temporada Encerrada!");
                            }}
                            className="p-2.5 text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors border border-transparent hover:border-amber-500/30"
                            title="Finalizar Temporada"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setNewSplitName(s.name);
                            setNewSplitChampId(s.championshipId);
                            setNewSplitFormat(s.format);
                            setEditingSplitId(s.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="p-2.5 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Pencil size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "players" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Gerenciar Jogadores
                </h3>
                <div
                  className={`bg-slate-950 p-8 rounded-2xl border mb-10 transition-colors ${
                    editingPlayerId
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h4
                      className={`${
                        editingPlayerId ? "text-blue-400" : "text-amber-400"
                      } font-bold text-xs uppercase flex items-center gap-2 tracking-widest`}
                    >
                      {editingPlayerId ? (
                        <>
                          <Pencil size={14} /> Editando Jogador
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Novo Jogador
                        </>
                      )}
                    </h4>
                    {editingPlayerId && (
                      <button
                        onClick={() => {
                          setNewPlayer({ nickname: "", gameId: "" });
                          setNewPlayerImage("");
                          setEditingPlayerId(null);
                        }}
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 text-[10px] uppercase font-bold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                      >
                        <X size={12} /> Cancelar
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                        Nickname
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Faker"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors"
                        value={newPlayer.nickname}
                        onChange={(e) =>
                          setNewPlayer({
                            ...newPlayer,
                            nickname: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                        Game ID
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Faker#KR1"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors"
                        value={newPlayer.gameId}
                        onChange={(e) =>
                          setNewPlayer({ ...newPlayer, gameId: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 border-dashed mb-6">
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-4 tracking-wider">
                      Avatar (Opcional)
                    </label>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-3 px-6 rounded-lg border border-slate-600 transition-colors flex items-center gap-2 shadow-lg">
                        <Upload size={16} /> Escolher Arquivo{" "}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, setNewPlayerImage)
                          }
                        />
                      </label>
                    </div>
                    {newPlayerImage && (
                      <div className="mt-6 relative w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-800 shadow-xl group">
                        <img
                          src={newPlayerImage}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setNewPlayerImage("")}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (newPlayer.nickname && newPlayer.gameId) {
                        if (editingPlayerId) {
                          onUpdatePlayer(editingPlayerId, {
                            nickname: newPlayer.nickname,
                            gameId: newPlayer.gameId,
                            avatarUrl: newPlayerImage,
                          });
                          triggerFeedback("Jogador atualizado!");
                          setEditingPlayerId(null);
                        } else {
                          onAddPlayer({
                            ...newPlayer,
                            avatarUrl: newPlayerImage,
                          });
                          triggerFeedback("Jogador cadastrado!");
                        }
                        setNewPlayer({ nickname: "", gameId: "" });
                        setNewPlayerImage("");
                      }
                    }}
                    className={`font-bold uppercase w-full py-4 rounded-lg text-sm transition-all shadow-lg ${
                      editingPlayerId
                        ? "bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/20"
                        : "bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20"
                    }`}
                  >
                    {editingPlayerId
                      ? "Salvar Alterações"
                      : "Cadastrar Jogador"}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {data.players.map((player) => (
                    <div
                      key={player.id}
                      className={`bg-slate-950 p-5 rounded-xl border flex items-center justify-between transition-all hover:border-slate-600 hover:shadow-md ${
                        editingPlayerId === player.id
                          ? "border-blue-500/50 bg-blue-900/10"
                          : "border-slate-800"
                      } ${player.isPaused ? "opacity-60 grayscale" : ""}`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={player.avatarUrl}
                          className="w-12 h-12 rounded-lg bg-slate-900 object-cover border border-slate-800"
                        />
                        <div>
                          <div className="text-white font-bold text-sm flex items-center gap-2">
                            {player.nickname}
                            {player.clanId && (
                              <span className="text-[10px] text-amber-500 border border-amber-500/30 px-1.5 py-0.5 rounded bg-amber-500/5 font-mono tracking-tight">
                                {
                                  data.clans.find((c) => c.id === player.clanId)
                                    ?.tag
                                }
                              </span>
                            )}
                          </div>
                          <div className="text-slate-500 text-[10px] font-mono mt-0.5">
                            {player.gameId}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onPausePlayer(player.id)}
                          className={`p-2.5 rounded-lg transition-colors ${
                            player.isPaused
                              ? "text-green-400 hover:bg-green-400/10"
                              : "text-slate-500 hover:text-amber-400 hover:bg-amber-400/10"
                          }`}
                          title={player.isPaused ? "Reativar" : "Pausar"}
                        >
                          <Power size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setNewPlayer({
                              nickname: player.nickname,
                              gameId: player.gameId,
                            });
                            setNewPlayerImage(player.avatarUrl);
                            setEditingPlayerId(player.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="p-2.5 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => openBanModal(player)}
                          className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Banir"
                        >
                          <Gavel size={18} />
                        </button>
                        <button
                          onClick={() => {
                            onRemovePlayer(player.id);
                            triggerFeedback("Jogador removido!");
                          }}
                          className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "sponsors" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Marcas & Patrocinadores
                </h3>
                <div
                  className={`bg-slate-950 p-8 rounded-2xl border mb-10 transition-colors ${
                    editingSponsorId
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h4
                      className={`${
                        editingSponsorId ? "text-blue-400" : "text-amber-400"
                      } font-bold text-xs uppercase flex items-center gap-2 tracking-widest`}
                    >
                      {editingSponsorId ? (
                        <>
                          <Pencil size={14} /> Editando Patrocinador
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Nova Marca
                        </>
                      )}
                    </h4>
                    {editingSponsorId && (
                      <button
                        onClick={() => {
                          setNewSponsorName("");
                          setNewSponsorLogo("");
                          setNewSponsorType("victory");
                          setNewSponsorAmount("");
                          setNewSponsorClan("");
                          setNewSponsorCost("");
                          setNewSponsorReqTitles("0");
                          setNewSponsorTolerance("3");
                          setNewSponsorIsPremium(false);
                          setEditingSponsorId(null);
                        }}
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 text-[10px] uppercase font-bold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                      >
                        <X size={12} /> Cancelar
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Nome da Marca
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Coca-Cola"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400"
                        value={newSponsorName}
                        onChange={(e) => setNewSponsorName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Logo da Marca
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-3.5 px-4 rounded-lg border border-slate-600 transition-colors flex items-center gap-2 shrink-0">
                          <Upload size={14} /> Upload{" "}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e, setNewSponsorLogo)
                            }
                          />
                        </label>
                        {newSponsorLogo && (
                          <img
                            src={newSponsorLogo}
                            className="h-10 w-10 object-contain rounded bg-slate-800 p-1"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Formato de Pagamento
                      </label>
                      <select
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400"
                        value={newSponsorType}
                        onChange={(e) => setNewSponsorType(e.target.value)}
                      >
                        <option value="victory">
                          Bônus por Vitória no Mapa
                        </option>
                        <option value="fixed">Cota Fixa por Mapa Jogado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Valor Pago ao Clã (R$)
                      </label>
                      <input
                        type="number"
                        placeholder="Ex: 200000"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none font-mono focus:border-amber-400"
                        value={newSponsorAmount}
                        onChange={(e) => setNewSponsorAmount(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2 bg-amber-500/10 border border-amber-500/30 p-5 rounded-xl flex items-center justify-between shadow-inner">
                      <div>
                        <div className="text-amber-500 font-black text-sm uppercase tracking-tight flex items-center gap-2 mb-1">
                          <Crown size={18} /> Patrocinador Premium (Dinheiro
                          Real)
                        </div>
                        <div className="text-slate-400 text-xs">
                          Marcas compradas via PIX. São vitálícias, isentas de
                          custos pro Clã e imunes a derrotas.
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={newSponsorIsPremium}
                          onChange={(e) =>
                            setNewSponsorIsPremium(e.target.checked)
                          }
                        />
                        <div className="w-14 h-7 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-white"></div>
                      </label>
                    </div>

                    {/* CUSTOS E REQUISITOS (SOMENTE SE NÃO FOR PREMIUM) */}
                    {!newSponsorIsPremium && (
                      <>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 border-dashed">
                          <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                            Custo de Assinatura (R$ do Jogo)
                          </label>
                          <input
                            type="number"
                            placeholder="Ex: 500000"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm outline-none font-mono focus:border-amber-400"
                            value={newSponsorCost}
                            onChange={(e) => setNewSponsorCost(e.target.value)}
                          />
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 border-dashed">
                          <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                            Exigência de Títulos (Mínimo)
                          </label>
                          <input
                            type="number"
                            min="0"
                            placeholder="Ex: 1"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm outline-none font-mono focus:border-amber-400"
                            value={newSponsorReqTitles}
                            onChange={(e) =>
                              setNewSponsorReqTitles(e.target.value)
                            }
                          />
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 border-dashed md:col-span-2">
                          <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                            Tolerância à Má Fase (Rompimento de Contrato)
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min="1"
                              placeholder="3"
                              className="w-24 bg-slate-950 border border-slate-700 rounded-lg p-3 text-center text-white text-sm outline-none font-mono focus:border-amber-400"
                              value={newSponsorTolerance}
                              onChange={(e) =>
                                setNewSponsorTolerance(e.target.value)
                              }
                            />
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                              Derrotas Seguidas
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Vincular a um Clã (Contrato Exclusivo)
                      </label>
                      <select
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400"
                        value={newSponsorClan}
                        onChange={(e) => setNewSponsorClan(e.target.value)}
                      >
                        <option value="">Aguardando Proposta (Nenhum)</option>
                        {data.clans.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} [{c.tag}]
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (
                        newSponsorName &&
                        newSponsorLogo &&
                        newSponsorAmount
                      ) {
                        const sData = {
                          name: newSponsorName,
                          logoUrl: newSponsorLogo,
                          type: newSponsorType,
                          amount: parseFloat(newSponsorAmount),
                          clanId: newSponsorClan || null,
                          isPremium: newSponsorIsPremium,
                          cost: newSponsorIsPremium
                            ? 0
                            : parseFloat(newSponsorCost || 0),
                          reqTitles: newSponsorIsPremium
                            ? 0
                            : parseInt(newSponsorReqTitles || 0),
                          tolerance: newSponsorIsPremium
                            ? 0
                            : parseInt(newSponsorTolerance || 3),
                        };
                        if (editingSponsorId) {
                          onUpdateSponsor(editingSponsorId, sData);
                          triggerFeedback("Patrocinador atualizado!");
                        } else {
                          onAddSponsor(sData);
                          triggerFeedback("Novo Patrocinador assinado!");
                        }
                        setNewSponsorName("");
                        setNewSponsorLogo("");
                        setNewSponsorType("victory");
                        setNewSponsorAmount("");
                        setNewSponsorClan("");
                        setNewSponsorCost("");
                        setNewSponsorReqTitles("0");
                        setNewSponsorTolerance("3");
                        setNewSponsorIsPremium(false);
                        setEditingSponsorId(null);
                      } else {
                        triggerFeedback("Preencha nome, logo e valor pago!");
                      }
                    }}
                    className={`font-bold uppercase w-full py-4 rounded-lg text-sm transition-all shadow-lg flex justify-center items-center gap-2 ${
                      editingSponsorId
                        ? "bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/20"
                        : "bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20"
                    }`}
                  >
                    {newSponsorIsPremium ? (
                      <Crown size={18} />
                    ) : (
                      <Handshake size={18} />
                    )}
                    {editingSponsorId
                      ? "Salvar Alterações"
                      : "Assinar Contrato de Patrocínio"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {data.sponsors?.map((sponsor) => {
                    const clan = data.clans.find(
                      (c) => c.id === sponsor.clanId
                    );
                    return (
                      <div
                        key={sponsor.id}
                        className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-center justify-between transition-all hover:border-slate-600 relative overflow-hidden group"
                      >
                        {sponsor.isPremium && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600"></div>
                        )}
                        <div className="flex items-center gap-4 pl-2">
                          <div
                            className={`w-14 h-14 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-inner ${
                              sponsor.isPremium ? "ring-2 ring-amber-400" : ""
                            }`}
                          >
                            <img
                              src={sponsor.logoUrl}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-white font-bold text-sm flex items-center gap-2">
                              {sponsor.name}
                            </div>
                            <div className="flex flex-col gap-1.5 mt-2">
                              <span
                                className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded w-fit ${
                                  sponsor.type === "victory"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                }`}
                              >
                                {sponsor.type === "victory"
                                  ? "Por Vitória:"
                                  : "Por Mapa Jogado:"}{" "}
                                {formatCurrency(sponsor.amount)}
                              </span>
                              <div className="flex flex-wrap items-center gap-2">
                                {sponsor.isPremium ? (
                                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gradient-to-r from-amber-400 to-amber-600 text-black shadow-md flex items-center gap-1">
                                    <Crown size={10} /> Premium Vitalício
                                  </span>
                                ) : (
                                  <>
                                    {sponsor.cost > 0 && (
                                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                        Custo: {formatCurrency(sponsor.cost)}
                                      </span>
                                    )}
                                    {sponsor.reqTitles > 0 && (
                                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                                        <Trophy size={10} /> {sponsor.reqTitles}{" "}
                                        Mín.
                                      </span>
                                    )}
                                    {sponsor.tolerance > 0 && (
                                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-red-400 border border-red-900/30 flex items-center gap-1">
                                        <AlertTriangle size={10} /> Rompe com{" "}
                                        {sponsor.tolerance} Derrotas
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold mt-1">
                                {clan
                                  ? `Atrelado a: ${clan.name}`
                                  : "Aguardando Proposta..."}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setNewSponsorName(sponsor.name);
                              setNewSponsorLogo(sponsor.logoUrl);
                              setNewSponsorType(sponsor.type);
                              setNewSponsorAmount(sponsor.amount);
                              setNewSponsorClan(sponsor.clanId || "");
                              setNewSponsorIsPremium(
                                sponsor.isPremium || false
                              );
                              setNewSponsorCost(sponsor.cost || "");
                              setNewSponsorReqTitles(sponsor.reqTitles || "0");
                              setNewSponsorTolerance(
                                sponsor.tolerance?.toString() || "3"
                              );
                              setEditingSponsorId(sponsor.id);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="p-2.5 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => {
                              onDeleteSponsor(sponsor.id);
                              triggerFeedback("Marca removida!");
                            }}
                            className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {(!data.sponsors || data.sponsors.length === 0) && (
                    <div className="col-span-full text-center py-12 text-slate-500 text-sm italic border border-dashed border-slate-800 rounded-xl">
                      Nenhuma marca patrocinadora cadastrada.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- ABA DA LOJA VIP (ADMIN) --- */}
            {activeTab === "store" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Gerenciar Loja VIP
                </h3>

                {/* CRIAR/EDITAR ITEM */}
                <div
                  className={`bg-slate-950 p-8 rounded-2xl border mb-10 shadow-lg transition-colors ${
                    editingStoreItemId
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h4
                      className={`font-bold text-xs uppercase flex items-center gap-2 tracking-widest ${
                        editingStoreItemId ? "text-blue-400" : "text-amber-400"
                      }`}
                    >
                      {editingStoreItemId ? (
                        <>
                          <Pencil size={14} /> Editando Item da Loja
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Cadastrar Novo Item
                        </>
                      )}
                    </h4>
                    {editingStoreItemId && (
                      <button
                        onClick={() => {
                          setEditingStoreItemId(null);
                          setNewStoreItemName("");
                          setNewStoreItemCategory("ingame");
                          setNewStoreItemPrice("");
                          setNewStoreItemStock("");
                          setNewStoreItemImage("");
                          setNewStoreItemIsPremium(false);
                        }}
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 text-[10px] uppercase font-bold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                      >
                        <X size={12} /> Cancelar
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Nome do Item
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Faca Butterfly"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-blue-400"
                        value={newStoreItemName}
                        onChange={(e) => setNewStoreItemName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Categoria
                      </label>
                      <select
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-blue-400"
                        value={newStoreItemCategory}
                        onChange={(e) =>
                          setNewStoreItemCategory(e.target.value)
                        }
                      >
                        <option value="ingame">Item do Jogo</option>
                        <option value="cosmetic">Cosmético de Perfil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Preço (R$)
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none font-mono focus:border-blue-400"
                        value={newStoreItemPrice}
                        onChange={(e) => setNewStoreItemPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Estoque Limitado (Unidades)
                      </label>
                      <input
                        type="number"
                        placeholder="99"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none font-mono focus:border-blue-400"
                        value={newStoreItemStock}
                        onChange={(e) => setNewStoreItemStock(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2 bg-slate-900/50 p-5 rounded-xl border border-slate-800 border-dashed">
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-4 tracking-wider">
                        Imagem do Item (Upload)
                      </label>
                      <div className="flex items-center gap-6">
                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-3 px-6 rounded-lg border border-slate-600 transition-colors flex items-center gap-2 shadow-lg">
                          <Upload size={16} /> Escolher Arquivo do PC
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e, setNewStoreItemImage)
                            }
                          />
                        </label>
                        {newStoreItemImage && (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-800 p-1 flex items-center justify-center group">
                            <img
                              src={newStoreItemImage}
                              className="max-w-full max-h-full object-contain"
                              alt="Preview"
                            />
                            <button
                              onClick={() => setNewStoreItemImage("")}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                              title="Remover imagem"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2 bg-amber-500/10 border border-amber-500/30 p-5 rounded-xl flex items-center justify-between shadow-inner">
                      <div>
                        <div className="text-amber-500 font-black text-sm uppercase tracking-tight flex items-center gap-2 mb-1">
                          <Crown size={18} /> Item Premium (Dinheiro Real)
                        </div>
                        <div className="text-slate-400 text-xs">
                          O jogador não gasta salário virtual. O pagamento é
                          feito externamente com dinheiro real.
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={newStoreItemIsPremium}
                          onChange={(e) =>
                            setNewStoreItemIsPremium(e.target.checked)
                          }
                        />
                        <div className="w-14 h-7 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-white"></div>
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (newStoreItemName && newStoreItemImage) {
                        const itemData = {
                          name: newStoreItemName,
                          category: newStoreItemCategory,
                          price: parseFloat(newStoreItemPrice || 0),
                          stock: parseInt(newStoreItemStock || 99),
                          imageUrl: newStoreItemImage,
                          isPremium: newStoreItemIsPremium,
                        };

                        if (editingStoreItemId) {
                          onUpdateStoreItem(editingStoreItemId, itemData);
                          triggerFeedback("Item atualizado com sucesso!");
                          setEditingStoreItemId(null);
                        } else {
                          onAddStoreItem(itemData);
                          triggerFeedback("Item cadastrado na loja!");
                        }

                        setNewStoreItemName("");
                        setNewStoreItemCategory("ingame");
                        setNewStoreItemPrice("");
                        setNewStoreItemStock("");
                        setNewStoreItemImage("");
                        setNewStoreItemIsPremium(false);
                      } else {
                        alert("Nome e Imagem são obrigatórios.");
                      }
                    }}
                    className={`w-full font-bold uppercase py-4 rounded-lg text-sm transition-all shadow-lg ${
                      editingStoreItemId
                        ? "bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/20"
                        : "bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20"
                    }`}
                  >
                    {editingStoreItemId
                      ? "Salvar Alterações"
                      : "Adicionar à Vitrine"}
                  </button>
                </div>

                {/* PAINEL DE VENDA MANUAL PARA O ADMIN */}
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-lg mb-10">
                  <h4 className="text-emerald-400 font-bold text-xs uppercase mb-6 flex items-center gap-2 tracking-widest">
                    <Wallet size={14} /> Executar Venda
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Comprador
                      </label>
                      <select
                        id="buyerSelect"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-emerald-400"
                      >
                        <option value="">Selecione o jogador...</option>
                        {data.players.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.nickname} (Saldo:{" "}
                            {formatCurrency(p.totalEarnings || 0)})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2">
                        Item Desejado
                      </label>
                      <select
                        id="itemSelect"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-emerald-400"
                      >
                        <option value="">Selecione o item...</option>
                        {data.items?.map((i) => (
                          <option
                            key={i.id}
                            value={i.id}
                            disabled={i.stock <= 0}
                          >
                            {i.name} -{" "}
                            {i.isPremium ? "Premium" : formatCurrency(i.price)}{" "}
                            {i.stock <= 0 ? "(ESGOTADO)" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const playerId =
                        document.getElementById("buyerSelect").value;
                      const itemId =
                        document.getElementById("itemSelect").value;
                      if (playerId && itemId) {
                        onSellStoreItem(playerId, itemId);
                      } else {
                        alert("Selecione um comprador e um item.");
                      }
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase py-4 rounded-lg text-sm transition-all shadow-lg shadow-emerald-500/20 flex justify-center items-center gap-2"
                  >
                    <Check size={18} /> Concluir Transação
                  </button>
                </div>

                {/* LISTA DE ITENS PARA EXCLUIR */}
                <h4 className="text-slate-400 font-bold text-xs uppercase mb-4 tracking-widest">
                  Estoque Atual
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.items?.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          className="w-10 h-10 object-contain"
                        />
                        <div>
                          <div className="text-white font-bold text-xs">
                            {item.name}
                          </div>
                          <div className="text-slate-500 text-[10px] font-mono">
                            Estoque: {item.stock}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingStoreItemId(item.id);
                            setNewStoreItemName(item.name);
                            setNewStoreItemCategory(item.category);
                            setNewStoreItemPrice(item.price);
                            setNewStoreItemStock(item.stock);
                            setNewStoreItemImage(item.imageUrl);
                            setNewStoreItemIsPremium(item.isPremium || false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 p-2 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteStoreItem(item.id)}
                          className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!data.items || data.items.length === 0) && (
                    <div className="col-span-full py-12 text-center text-slate-500 text-sm italic border border-dashed border-slate-800 rounded-xl">
                      A loja está vazia. Adicione alguns itens!
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "championships" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Campeonatos
                </h3>
                <div
                  className={`bg-slate-950 p-8 rounded-2xl border mb-10 transition-colors ${
                    editingChampId
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h4
                      className={`${
                        editingChampId ? "text-blue-400" : "text-amber-400"
                      } font-bold text-xs uppercase flex items-center gap-2 tracking-widest`}
                    >
                      {editingChampId ? (
                        <>
                          <Pencil size={14} /> Editando Campeonato
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Novo Campeonato
                        </>
                      )}
                    </h4>
                    {editingChampId && (
                      <button
                        onClick={() => {
                          setNewChampName("");
                          setNewChampIcon("");
                          setEditingChampId(null);
                        }}
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 text-[10px] uppercase font-bold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                      >
                        <X size={12} /> Cancelar
                      </button>
                    )}
                  </div>
                  <div className="mb-6">
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                      Nome do Campeonato
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Liga MVL - Série B"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors"
                      value={newChampName}
                      onChange={(e) => setNewChampName(e.target.value)}
                    />
                  </div>
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 border-dashed mb-6">
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-3 tracking-wider">
                      Ícone do Troféu (URL)
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none mb-4 focus:border-amber-400 transition-colors"
                      value={newChampIcon}
                      onChange={(e) => setNewChampIcon(e.target.value)}
                    />
                    {newChampIcon && (
                      <div className="flex justify-center p-4 bg-slate-800 rounded-lg">
                        <img
                          src={newChampIcon}
                          className="h-16 w-16 object-contain drop-shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (newChampName) {
                        if (editingChampId) {
                          onUpdateChampionship(editingChampId, {
                            name: newChampName,
                            trophyUrl: newChampIcon,
                          });
                          triggerFeedback("Campeonato atualizado!");
                        } else {
                          onAddChampionship(newChampName, newChampIcon);
                          triggerFeedback("Campeonato criado!");
                        }
                        setNewChampName("");
                        setNewChampIcon("");
                        setEditingChampId(null);
                      }
                    }}
                    className={`font-bold uppercase w-full py-4 rounded-lg text-sm transition-all shadow-lg ${
                      editingChampId
                        ? "bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/20"
                        : "bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20"
                    }`}
                  >
                    {editingChampId ? "Salvar Alterações" : "Criar Campeonato"}
                  </button>
                </div>
                <div className="space-y-4">
                  {data.championships.map((c) => (
                    <div
                      key={c.id}
                      className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        {c.trophyUrl && (
                          <img
                            src={c.trophyUrl}
                            className="w-10 h-10 object-contain drop-shadow"
                          />
                        )}
                        <span className="text-white font-bold text-sm">
                          {c.name}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setNewChampName(c.name);
                            setNewChampIcon(c.trophyUrl);
                            setEditingChampId(c.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="p-2.5 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => {
                            onRemoveChampionship(c.id);
                            triggerFeedback("Campeonato excluído!");
                          }}
                          className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "maps" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Map Pool
                </h3>
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 mb-10 shadow-lg">
                  <h4 className="text-amber-400 font-bold text-xs uppercase mb-4 flex items-center gap-2 tracking-widest">
                    <Plus size={14} /> Adicionar Mapa
                  </h4>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Nome do Mapa"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors"
                      value={newMapName}
                      onChange={(e) => setNewMapName(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (newMapName) {
                          onAddMap(newMapName);
                          setNewMapName("");
                          triggerFeedback("Mapa adicionado!");
                        }
                      }}
                      className="bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase px-8 rounded-lg text-sm transition-all shadow-lg shadow-amber-400/20"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {data.maps.map((map) => (
                    <div
                      key={map.id}
                      className={`p-5 rounded-xl border flex flex-col items-center gap-3 transition-all hover:scale-[1.02] ${
                        map.isActive
                          ? "bg-slate-900 border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                          : "bg-slate-950 border-slate-800 opacity-60 grayscale"
                      }`}
                    >
                      <span className="text-white font-bold text-base">
                        {map.name}
                      </span>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => onToggleMap(map.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            map.isActive
                              ? "text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20"
                              : "text-slate-500 bg-slate-800 hover:text-white"
                          }`}
                          title={map.isActive ? "Desativar" : "Ativar"}
                        >
                          {map.isActive ? (
                            <CheckCircle size={18} />
                          ) : (
                            <PowerOff size={18} />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            onRemoveMap(map.id);
                            triggerFeedback("Mapa excluído!");
                          }}
                          className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "news" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Gerenciar Notícias
                </h3>
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 mb-10 shadow-lg">
                  <h4 className="text-amber-400 font-bold text-xs uppercase mb-6 flex items-center gap-2 tracking-widest">
                    <Plus size={14} /> Nova Notícia
                  </h4>
                  <div className="space-y-6">
                    <input
                      type="text"
                      placeholder="Título da Manchete"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors"
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                    />
                    <textarea
                      placeholder="Conteúdo da notícia..."
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm outline-none focus:border-amber-400 transition-colors resize-none"
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                    ></textarea>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 border-dashed">
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-4 tracking-wider">
                        Imagem de Capa
                      </label>
                      <div className="flex items-center gap-6">
                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-3 px-6 rounded-lg border border-slate-600 transition-colors flex items-center gap-2 shadow-lg">
                          <Upload size={16} /> Upload{" "}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setNewsImage)}
                          />
                        </label>
                        {newsImage && (
                          <span className="text-green-400 text-xs flex items-center gap-1.5 font-bold">
                            <CheckCircle size={14} /> Imagem carregada
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (newsTitle && newsContent && newsImage) {
                          onAddNews({
                            title: newsTitle,
                            content: newsContent,
                            imageUrl: newsImage,
                          });
                          setNewsTitle("");
                          setNewsContent("");
                          setNewsImage("");
                          triggerFeedback("Notícia publicada!");
                        } else {
                          setFeedback("Preencha todos os campos.");
                        }
                      }}
                      className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase py-4 rounded-lg text-sm transition-all shadow-lg shadow-amber-400/20"
                    >
                      Publicar Notícia
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {data.news.map((n) => (
                    <div
                      key={n.id}
                      className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex gap-6 group hover:border-slate-700 transition-all hover:shadow-md"
                    >
                      <img
                        src={n.imageUrl}
                        className="w-32 h-20 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="flex-1">
                        <div className="text-white font-bold text-sm line-clamp-1 mb-1">
                          {n.title}
                        </div>
                        <div className="text-slate-500 text-xs mb-2 line-clamp-2 leading-relaxed">
                          {n.content}
                        </div>
                        <div className="text-[10px] text-slate-600 font-bold flex items-center gap-1">
                          <Calendar size={10} /> {n.date}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onRemoveNews(n.id);
                          triggerFeedback("Notícia excluída!");
                        }}
                        className="text-slate-500 hover:text-red-400 self-start p-2 rounded-lg hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "bans" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Jogadores Banidos
                </h3>
                <div className="space-y-4">
                  {data.bannedPlayers.map((ban) => (
                    <div
                      key={ban.id}
                      className="bg-slate-950 p-5 rounded-xl border border-red-500/20 flex items-center justify-between shadow-red-500/5 shadow-lg"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 border border-red-500/20">
                          <Ban size={24} />
                        </div>
                        <div>
                          <div className="text-white font-bold text-base mb-0.5">
                            {ban.nickname || ban.gameId}
                          </div>
                          <div className="text-red-400 text-xs font-mono bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 w-fit mb-1.5">
                            {ban.reason}
                          </div>
                          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                            Expira em:{" "}
                            <span className="text-slate-300">
                              {ban.unbanDate
                                ? new Date(ban.unbanDate).toLocaleDateString()
                                : "Permanente"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => openUnbanModal(ban)}
                        className="text-slate-500 hover:text-green-400 hover:bg-green-400/10 p-3 rounded-xl transition-colors"
                        title="Revogar Banimento"
                      >
                        <RefreshCcw size={20} />
                      </button>
                    </div>
                  ))}
                  {data.bannedPlayers.length === 0 && (
                    <div className="text-center py-16 text-slate-500 text-sm italic border border-dashed border-slate-800 rounded-2xl">
                      Nenhuma punição ativa.
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === "settings" && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4 tracking-tight">
                  Configurações Gerais
                </h3>
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-8">
                  <div>
                    <h4 className="text-amber-400 font-bold text-xs uppercase mb-4 flex items-center gap-2 tracking-widest">
                      <Home size={14} /> Identidade Visual (Navbar)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-1">
                        <label className="block text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                          Nome / Sigla do Site
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: MVL"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3.5 text-white text-sm focus:border-amber-400 outline-none transition-colors"
                          value={settingsForm.siteName}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              siteName: e.target.value,
                            })
                          }
                        />
                        <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                          <AlertCircle size={10} /> Aparece no canto superior
                          esquerdo da barra de navegação.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-800 pt-8">
                    <h4 className="text-amber-400 font-bold text-xs uppercase mb-4 flex items-center gap-2 tracking-widest">
                      <ImageIcon size={14} /> Banner Principal (Home)
                    </h4>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 border-dashed">
                      <label className="block text-slate-400 text-[10px] uppercase font-bold mb-4 tracking-wider">
                        Imagem de Fundo do Banner (Arte Completa)
                      </label>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-3 px-6 rounded-lg border border-slate-600 transition-colors flex items-center gap-2 shadow-lg">
                          <Upload size={16} /> Escolher Nova Imagem{" "}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e, (url) =>
                                setSettingsForm({
                                  ...settingsForm,
                                  heroBackgroundUrl: url,
                                })
                              )
                            }
                          />
                        </label>
                        <span className="text-slate-500 text-[10px] flex items-center gap-1.5">
                          <AlertCircle size={14} /> Suba sua arte final com
                          texto. (1920x1080 recomendado).
                        </span>
                      </div>
                      {settingsForm.heroBackgroundUrl && (
                        <div className="mt-6 relative w-full h-40 rounded-xl overflow-hidden border border-amber-400/30 shadow-lg group">
                          <img
                            src={settingsForm.heroBackgroundUrl}
                            className="w-full h-full object-cover"
                            alt="Preview Banner"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="bg-black/50 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur border border-white/10">
                              Preview do Banner
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onUpdateSettings(settingsForm);
                      triggerFeedback("Configurações salvas!");
                    }}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase py-4 rounded-lg text-sm transition-all shadow-lg shadow-amber-400/20"
                  >
                    Salvar Configurações
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL APP E CONEXÃO DE DADOS
// ============================================================================
const App = () => {
  const [db, setDb] = useState({
    players: SEED_PLAYERS,
    clans: SEED_CLANS,
    splits: [
      {
        id: "s1",
        name: "Split 1 - Abertura",
        championshipId: "c1",
        format: "cxc",
        startDate: "2024-02-01",
        endDate: "",
        isActive: true,
        isFinished: false,
        enrolledClans: [],
      },
    ],
    championships: SEED_CHAMPIONSHIPS,
    maps: SEED_MAPS,
    matches: [],
    stats: [],
    news: SEED_NEWS,
    series: [],
    bannedPlayers: SEED_BANNED,
    sponsors: typeof SEED_SPONSORS !== "undefined" ? SEED_SPONSORS : [],
    items: typeof SEED_STORE_ITEMS !== "undefined" ? SEED_STORE_ITEMS : [],
    settings: DEFAULT_SETTINGS,
    adminMenuOrder: DEFAULT_ADMIN_MENU_ORDER,
    transfers: SEED_TRANSFERS,
    financialLogs: SEED_FINANCIAL_LOGS,
  });

  const [view, setView] = useState("home");
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginInput, setLoginInput] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  // FUNÇÃO PARA TESTAR O FIREBASE
  const testarConexaoFirebase = async () => {
    try {
      const docRef = await addDoc(collection(firebaseDb, "testes_conexao"), {
        item: "Premium MVL",
        status: "ativo",
        dataTeste: new Date(),
      });
      console.log("✅ Sucesso ao SALVAR! ID do documento: ", docRef.id);

      const querySnapshot = await getDocs(
        collection(firebaseDb, "testes_conexao")
      );
      console.log("🔍 Lendo dados do banco de dados:");
      querySnapshot.forEach((doc) => {
        console.log(`Documento lido: ${doc.id} => `, doc.data());
      });

      alert("Conexão perfeita! Dê uma olhada no console do navegador (F12).");
    } catch (erro) {
      console.error("❌ Ops, erro ao conectar: ", erro);
      alert("Erro na conexão. Verifique o console (F12).");
    }
  };

  const backend = useMemo(() => new BackendController(db), [db]);
  const activeSplit = db.splits.find((s) => s.isActive);
  const splitRanking = activeSplit
    ? backend.getPlayerStatsForSplit(activeSplit.id)
    : [];
  const globalRanking = backend.getGlobalRanking();
  const champion = backend.getChampion();
  const selectedProfileData = useMemo(
    () =>
      selectedProfileId
        ? backend.getPlayerFullProfile(selectedProfileId)
        : null,
    [selectedProfileId, backend]
  );

  const secretClickCount = useRef(0);
  const secretClickTimer = useRef(null);
  const handleLogoClick = () => {
    setView("home");
    secretClickCount.current += 1;
    if (secretClickCount.current === 3) {
      if (isAdminLoggedIn) {
        setView("admin");
      } else {
        setShowLogin(true);
      }
      secretClickCount.current = 0;
    }
    clearTimeout(secretClickTimer.current);
    secretClickTimer.current = setTimeout(() => {
      secretClickCount.current = 0;
    }, 1000);
  };

  useEffect(() => {
    const updatedPlayers = db.players.map((p) => {
      const profile = backend.getPlayerFullProfile(p.id);
      const totalMatches = profile?.stats?.totalMatches || 0;
      const lastUpdate = p.lastValuationMatches || 0;
      if (
        totalMatches - lastUpdate >= 3 ||
        (totalMatches > 0 && lastUpdate === 0)
      ) {
        const dynamicValue = backend.calculateDynamicMarketValue(
          p,
          profile.stats
        );
        if (dynamicValue !== p.marketValue) {
          return {
            ...p,
            marketValue: dynamicValue,
            lastValuationMatches: totalMatches,
          };
        }
      }
      return p;
    });
    if (JSON.stringify(updatedPlayers) !== JSON.stringify(db.players)) {
      setDb((prev) => ({ ...prev, players: updatedPlayers }));
    }
  }, [db.stats]);

  const goToProfile = (playerId) => {
    setSelectedProfileId(playerId);
    setView("profile");
    window.scrollTo(0, 0);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginInput === "1234") {
      setIsAdminLoggedIn(true);
      setView("admin");
      setShowLogin(false);
      setLoginInput("");
    } else {
      alert("Senha incorreta");
    }
  };
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setView("home");
  };

  const handleToggleClanEnrollment = (splitId, clanId) => {
    setDb((prev) => ({
      ...prev,
      splits: prev.splits.map((s) => {
        if (s.id !== splitId) return s;
        const enrolled = s.enrolledClans || [];
        return {
          ...s,
          enrolledClans: enrolled.includes(clanId)
            ? enrolled.filter((id) => id !== clanId)
            : [...enrolled, clanId],
        };
      }),
    }));
  };
  const handleGenerateGroupStage = async (splitId) => {
    const split = db.splits.find((s) => s.id === splitId);
    if (!split || !split.enrolledClans || split.enrolledClans.length < 2) {
      alert("Inscreva pelo menos 2 clãs na fase anterior.");
      return;
    }
    const existing = db.series.filter(
      (s) => s.splitId === splitId && s.stage === "Fase de Grupos"
    );
    if (existing.length > 0) {
      alert("Fase de grupos já gerada! Desfaça para gerar novamente.");
      return;
    }

    const newSeries = [];
    const clans = split.enrolledClans;

    for (let i = 0; i < clans.length; i++) {
      for (let j = i + 1; j < clans.length; j++) {
        const clanA = db.clans.find((c) => c.id === clans[i]);
        const clanB = db.clans.find((c) => c.id === clans[j]);
        if (clanA && clanB) {
          const serieData = {
            id: generateId(),
            splitId: splitId,
            label: `Grupos`,
            stage: "Fase de Grupos",
            teamA: clanA.name,
            teamB: clanB.name,
            clanA_Id: clanA.id,
            clanB_Id: clanB.id,
            matchIds: [],
            date: new Date().toISOString(),
          };
          newSeries.push(serieData);
          await salvarNoFirebase("series", serieData);
        }
      }
    }

    setDb((prev) => ({
      ...prev,
      series: [...(prev.series || []), ...newSeries],
    }));
  };
  const handleUndoGroupStage = async (splitId) => {
    if (
      window.confirm(
        "⚠️ ATENÇÃO: Isso apagará TODOS os confrontos gerados da Fase de Grupos. Continuar?"
      )
    ) {
      const seriesToDelete = db.series.filter(
        (s) => s.splitId === splitId && s.stage === "Fase de Grupos"
      );

      for (const s of seriesToDelete) {
        try {
          await deleteDoc(doc(firebaseDb, "series", s.id));
        } catch (e) {
          console.error(e);
        }
      }

      setDb((prev) => ({
        ...prev,
        series: prev.series.filter(
          (s) => !(s.splitId === splitId && s.stage === "Fase de Grupos")
        ),
      }));
    }
  };

  const handleGeneratePlayoffs = async (splitId) => {
    const existing = db.series.filter(
      (s) => s.splitId === splitId && s.stage === "Playoffs"
    );
    if (existing.length > 0) {
      alert("Playoffs já gerados! Desfaça para gerar novamente.");
      return;
    }

    const b = new BackendController(db);
    const standings = b.getClanStandings(splitId);

    if (standings.length < 4) {
      alert(
        "São necessários pelo menos 4 times ranqueados para gerar a árvore de Playoffs."
      );
      return;
    }

    const newSeries = [
      {
        id: generateId(),
        splitId,
        label: "Semifinal 1",
        stage: "Playoffs",
        teamA: standings[0].name,
        teamB: standings[3].name,
        clanA_Id: standings[0].id,
        clanB_Id: standings[3].id,
        matchIds: [],
        date: new Date().toISOString(),
      },
      {
        id: generateId(),
        splitId,
        label: "Semifinal 2",
        stage: "Playoffs",
        teamA: standings[1].name,
        teamB: standings[2].name,
        clanA_Id: standings[1].id,
        clanB_Id: standings[2].id,
        matchIds: [],
        date: new Date().toISOString(),
      },
      {
        id: generateId(),
        splitId,
        label: "Grande Final",
        stage: "Playoffs",
        teamA: "Vencedor Semi 1",
        teamB: "Vencedor Semi 2",
        clanA_Id: null,
        clanB_Id: null,
        matchIds: [],
        date: new Date().toISOString(),
      },
    ];

    for (const s of newSeries) {
      await salvarNoFirebase("series", s);
    }

    setDb((prev) => ({
      ...prev,
      series: [...(prev.series || []), ...newSeries],
    }));
  };
  const handleGenerateMixTournament = async (splitId, playerIds) => {
    const b = new BackendController(db);
    const teamNames = [
      "Alfa",
      "Beta",
      "Gama",
      "Delta",
      "Epsilon",
      "Zeta",
      "Theta",
      "Sigma",
    ];
    const playersWithStats = playerIds
      .map((id) => {
        const profile = b.getPlayerFullProfile(id);
        return {
          id,
          kd: profile?.stats?.totalKD || 0,
          nickname: db.players.find((p) => p.id === id).nickname,
        };
      })
      .sort((a, b) => b.kd - a.kd);
    const numTeams = Math.floor(playersWithStats.length / 5);
    const teams = Array.from({ length: numTeams }, (_, i) => ({
      name: `Time ${teamNames[i]}`,
      players: [],
      avgKD: 0,
    }));
    playersWithStats.slice(0, numTeams * 5).forEach((player, index) => {
      const cycle = Math.floor(index / numTeams);
      const isReversed = cycle % 2 !== 0;
      const teamIndex = isReversed
        ? numTeams - 1 - (index % numTeams)
        : index % numTeams;
      teams[teamIndex].players.push(player);
    });
    teams.forEach((t) => {
      const sum = t.players.reduce((acc, p) => acc + p.kd, 0);
      t.avgKD = Number((sum / 5).toFixed(2));
    });
    const kds = teams.map((t) => t.avgKD);
    const diff = Math.max(...kds) - Math.min(...kds);
    const precision = Math.max(0, 100 - diff * 50).toFixed(1);
    const newSeries = [];
    if (numTeams === 2) {
      newSeries.push({
        id: generateId(),
        splitId,
        label: "Grande Final",
        stage: "Playoffs",
        teamA: teams[0].name,
        teamB: teams[1].name,
        clanA_Id: null,
        clanB_Id: null,
        matchIds: [],
        date: new Date().toISOString(),
        mixPlayersA: teams[0].players.map((p) => p.id),
        mixPlayersB: teams[1].players.map((p) => p.id),
      });
    } else if (numTeams >= 4) {
      newSeries.push({
        id: generateId(),
        splitId,
        label: "Semifinal 1",
        stage: "Playoffs",
        teamA: teams[0].name,
        teamB: teams[3].name,
        clanA_Id: null,
        clanB_Id: null,
        matchIds: [],
        date: new Date().toISOString(),
        mixPlayersA: teams[0].players.map((p) => p.id),
        mixPlayersB: teams[3].players.map((p) => p.id),
      });
      newSeries.push({
        id: generateId(),
        splitId,
        label: "Semifinal 2",
        stage: "Playoffs",
        teamA: teams[1].name,
        teamB: teams[2].name,
        clanA_Id: null,
        clanB_Id: null,
        matchIds: [],
        date: new Date().toISOString(),
        mixPlayersA: teams[1].players.map((p) => p.id),
        mixPlayersB: teams[2].players.map((p) => p.id),
      });
      newSeries.push({
        id: generateId(),
        splitId,
        label: "Grande Final",
        stage: "Playoffs",
        teamA: "Vencedor Semi 1",
        teamB: "Vencedor Semi 2",
        clanA_Id: null,
        clanB_Id: null,
        matchIds: [],
        date: new Date().toISOString(),
      });
    }

    for (const s of newSeries) {
      await salvarNoFirebase("series", s);
    }

    setDb((prev) => ({
      ...prev,
      series: [...(prev.series || []), ...newSeries],
    }));
    return { teams, precision };
  };

  const handleUndoPlayoffs = async (splitId) => {
    if (
      window.confirm(
        "⚠️ ATENÇÃO: Isso apagará a árvore de Playoffs. Continuar?"
      )
    ) {
      const seriesToDelete = db.series.filter(
        (s) => s.splitId === splitId && s.stage === "Playoffs"
      );
      for (const s of seriesToDelete) {
        try {
          await deleteDoc(doc(firebaseDb, "series", s.id));
        } catch (e) {
          console.error(e);
        }
      }

      setDb((prev) => ({
        ...prev,
        series: prev.series.filter(
          (s) => !(s.splitId === splitId && s.stage === "Playoffs")
        ),
      }));
    }
  };

  const updateSettings = (newSettings) =>
    setDb((prev) => ({ ...prev, settings: newSettings }));
  const updateAdminMenuOrder = (newOrder) =>
    setDb((prev) => ({ ...prev, adminMenuOrder: newOrder }));
  const addSeries = (seriesData) => {
    const newSeries = {
      id: generateId(),
      ...seriesData,
      date: new Date().toISOString(),
    };
    setDb((prev) => ({ ...prev, series: [...(prev.series || []), newSeries] }));
  };
  const updateSeries = (id, updatedData) =>
    setDb((prev) => ({
      ...prev,
      series: prev.series.map((s) =>
        s.id === id ? { ...s, ...updatedData } : s
      ),
    }));
  const deleteSeries = (id) => {
    setDb((prev) => ({
      ...prev,
      series: prev.series.filter((s) => s.id !== id),
    }));
  };
  const toggleMarketStatus = (reopenDate = null) =>
    setDb((prev) => ({
      ...prev,
      settings: {
        ...(prev.settings || DEFAULT_SETTINGS),
        marketStatus:
          prev.settings?.marketStatus === "closed" ? "open" : "closed",
        marketReopenDate: reopenDate,
      },
    }));

  const applyMarketSoftReset = (percentage) => {
    const discount = 1 - percentage / 100;
    setDb((prev) => {
      // Instancia o motor do backend aqui dentro para forçar o recálculo
      const backend = new BackendController(prev);

      return {
        ...prev,
        players: prev.players.map((p) => {
          // 1. Aplica o desconto no jogador
          const updatedPlayer = {
            ...p,
            devaluationMultiplier: (p.devaluationMultiplier || 1) * discount,
          };

          // 2. Lê a história inteira do jogador
          const profile = backend.getPlayerFullProfile(p.id);

          // 3. Força a matemática a rodar de novo IMEDIATAMENTE
          const newMarketValue = backend.calculateDynamicMarketValue(
            updatedPlayer,
            profile?.stats
          );

          return {
            ...updatedPlayer,
            marketValue: newMarketValue,
            lastValuationMatches: profile?.stats?.totalMatches || 0,
          };
        }),
      };
    });
  };

  // ============================================================
  // LOGICA DO BACKEND (FIREBASE & ESTADO LOCAL)
  // ============================================================

  const addSponsor = async (data) => {
    await salvarNoFirebase("sponsors", data);
  };

  const updateSponsor = async (id, data) => {
    try {
      await updateDoc(doc(firebaseDb, "sponsors", id), data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteSponsor = async (id) => {
    try {
      await deleteDoc(doc(firebaseDb, "sponsors", id));
    } catch (e) {
      console.error(e);
    }
  };

  const addPlayer = async (playerData) => {
    const id = generateId();
    const newPlayer = {
      id,
      nickname: playerData.nickname,
      gameId: playerData.gameId,
      avatarUrl:
        playerData.avatarUrl ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${playerData.nickname}`,
      isPaused: false,
      clanId: null,
      marketValue: 10000000,
      lastValuationMatches: 0,
      totalEarnings: 0,
      contractEnd: null,
      releaseClauseMultiplier: 0,
    };
    await salvarNoFirebase("players", newPlayer);
  };

  const updatePlayer = async (id, updatedData) => {
    try {
      await updateDoc(doc(firebaseDb, "players", id), updatedData);
    } catch (e) {
      console.error(e);
    }
  };

  const updateContract = async (id, contractEnd, releaseClauseMultiplier) => {
    try {
      await updateDoc(doc(firebaseDb, "players", id), {
        contractEnd: contractEnd || null,
        releaseClauseMultiplier,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const pausePlayer = async (id) => {
    const player = db.players.find((p) => p.id === id);
    if (!player) return;
    try {
      await updateDoc(doc(firebaseDb, "players", id), {
        isPaused: !player.isPaused,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const banPlayer = async (id, reason, duration) => {
    const player = db.players.find((p) => p.id === id);
    if (!player) return;
    let unbanDate = null;
    const now = new Date();
    if (duration !== "permanent") {
      const days = parseInt(duration);
      now.setDate(now.getDate() + days);
      unbanDate = now.toISOString();
    }
    const banId = generateId();
    const banRecord = {
      id: banId,
      gameId: player.gameId,
      reason: reason || "Violação",
      date: new Date().toLocaleDateString(),
      unbanDate,
      originalPlayerId: player.id,
      nickname: player.nickname,
      avatarUrl: player.avatarUrl,
    };
    try {
      await setDoc(doc(firebaseDb, "bannedPlayers", banId), banRecord);
      await deleteDoc(doc(firebaseDb, "players", id));
    } catch (e) {
      console.error(e);
    }
  };

  const unbanPlayer = async (banId) => {
    const banRecord = db.bannedPlayers.find((b) => b.id === banId);
    if (!banRecord) return;
    try {
      if (banRecord.originalPlayerId) {
        const restored = {
          id: banRecord.originalPlayerId,
          nickname: banRecord.nickname,
          gameId: banRecord.gameId,
          avatarUrl: banRecord.avatarUrl,
          isPaused: false,
          clanId: null,
          marketValue: 10000000,
        };
        await setDoc(doc(firebaseDb, "players", restored.id), restored);
      }
      await deleteDoc(doc(firebaseDb, "bannedPlayers", banId));
    } catch (e) {
      console.error(e);
    }
  };

  const removePlayer = async (id) => {
    try {
      await deleteDoc(doc(firebaseDb, "players", id));
    } catch (e) {
      console.error(e);
    }
  };

  const addClan = async (data) => {
    const id = generateId();
    await setDoc(doc(firebaseDb, "clans", id), { id, ...data });
  };

  const updateClan = async (id, data) => {
    try {
      await updateDoc(doc(firebaseDb, "clans", id), data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteClan = async (id) => {
    try {
      await deleteDoc(doc(firebaseDb, "clans", id));
      const members = db.players.filter((p) => p.clanId === id);
      for (const p of members) {
        await updateDoc(doc(firebaseDb, "players", p.id), {
          clanId: null,
          contractEnd: null,
          releaseClauseMultiplier: 0,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const assignPlayerToClan = async (clanId, playerId) => {
    try {
      await updateDoc(doc(firebaseDb, "players", playerId), { clanId });
    } catch (e) {
      console.error(e);
    }
  };

  const removePlayerFromClan = async (playerId) => {
    try {
      await updateDoc(doc(firebaseDb, "players", playerId), {
        clanId: null,
        contractEnd: null,
        releaseClauseMultiplier: 0,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updateClanFinancials = async (clanId, newBudget, reason, type) => {
    const clan = db.clans.find((c) => c.id === clanId);
    if (!clan) return;
    const diff = newBudget - clan.budget;
    try {
      await updateDoc(doc(firebaseDb, "clans", clanId), { budget: newBudget });
      await salvarNoFirebase("financialLogs", {
        id: generateId(),
        clanId,
        type,
        amount: diff,
        oldBalance: clan.budget,
        newBalance: newBudget,
        reason,
        date: new Date().toISOString(),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const transferPlayer = async (
    playerId,
    targetClanId,
    price,
    isHostile = false
  ) => {
    const player = db.players.find((p) => p.id === playerId);
    const fromClan = db.clans.find((c) => c.id === player?.clanId);
    const toClan = db.clans.find((c) => c.id === targetClanId);
    if (!player || !toClan) return;
    try {
      await updateDoc(doc(firebaseDb, "clans", targetClanId), {
        budget: toClan.budget - price,
      });
      if (fromClan) {
        await updateDoc(doc(firebaseDb, "clans", fromClan.id), {
          budget: fromClan.budget + price,
        });
        await salvarNoFirebase("financialLogs", {
          id: generateId(),
          clanId: fromClan.id,
          type: "transfer_sell",
          amount: price,
          oldBalance: fromClan.budget,
          newBalance: fromClan.budget + price,
          reason: `Venda de ${player.nickname}`,
          date: new Date().toISOString(),
        });
      }
      await updateDoc(doc(firebaseDb, "players", playerId), {
        clanId: targetClanId,
        contractEnd: null,
        releaseClauseMultiplier: 0,
      });
      await salvarNoFirebase("transfers", {
        id: generateId(),
        type: fromClan ? "transfer" : "contract",
        playerId: player.id,
        playerName: player.nickname,
        fromClanId: fromClan ? fromClan.id : null,
        toClanId: toClan.id,
        toClanName: toClan.name,
        value: price,
        date: new Date().toISOString(),
        isHostile,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const addStoreItem = async (itemData) => {
    await salvarNoFirebase("items", { id: generateId(), ...itemData });
  };

  const deleteStoreItem = async (id) => {
    try {
      await deleteDoc(doc(firebaseDb, "items", id));
    } catch (e) {
      console.error(e);
    }
  };

  const updateStoreItem = async (id, updatedData) => {
    try {
      await updateDoc(doc(firebaseDb, "items", id), updatedData);
    } catch (e) {
      console.error(e);
    }
  };

  const sellItemToPlayer = async (playerId, itemId) => {
    const player = db.players.find((p) => p.id === playerId);
    const item = db.items.find((i) => i.id === itemId);
    if (!player || !item || item.stock <= 0) return;
    let newEarnings = player.totalEarnings || 0;
    if (!item.isPremium) {
      if (newEarnings < item.price) {
        alert("Saldo insuficiente.");
        return;
      }
      newEarnings -= item.price;
    }
    try {
      await updateDoc(doc(firebaseDb, "players", playerId), {
        totalEarnings: newEarnings,
        inventory: [...(player.inventory || []), item],
      });
      await updateDoc(doc(firebaseDb, "items", itemId), {
        stock: item.stock - 1,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const addSplit = async (name, champId, format) => {
    const id = generateId();
    try {
      await salvarNoFirebase("splits", {
        id,
        name,
        championshipId: champId,
        format: format || "mix",
        startDate: new Date().toLocaleDateString(),
        isActive: true,
        isFinished: false,
        enrolledClans: [],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updateSplit = async (id, data) => {
    try {
      await updateDoc(doc(firebaseDb, "splits", id), data);
    } catch (e) {
      console.error(e);
    }
  };

  const endSplit = async (id) => {
    try {
      await updateDoc(doc(firebaseDb, "splits", id), {
        isActive: false,
        isFinished: true,
        endDate: new Date().toLocaleDateString(),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const saveMatch = async (info, stats, id, date) => {
    const matchId = id || generateId();
    try {
      await setDoc(doc(firebaseDb, "matches", matchId), {
        ...info,
        id: matchId,
        date: date || new Date().toISOString(),
      });
      for (const s of stats) {
        const sid = generateId();
        await setDoc(doc(firebaseDb, "stats", sid), { ...s, id: sid, matchId });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMatch = async (id) => {
    try {
      await deleteDoc(doc(firebaseDb, "matches", id));
    } catch (e) {
      console.error(e);
    }
  };

  const addChampionship = async (name, url) => {
    await salvarNoFirebase("championships", {
      id: generateId(),
      name,
      trophyUrl: url,
    });
  };

  const updateChampionship = async (id, data) => {
    try {
      await updateDoc(doc(firebaseDb, "championships", id), data);
    } catch (e) {
      console.error(e);
    }
  };

  const removeChampionship = async (id) => {
    try {
      await deleteDoc(doc(firebaseDb, "championships", id));
    } catch (e) {
      console.error(e);
    }
  };

  const addNews = async (data) => {
    await salvarNoFirebase("news", {
      id: generateId(),
      ...data,
      date: new Date().toLocaleDateString(),
    });
  };

  const removeNews = async (id) => {
    try {
      await deleteDoc(doc(firebaseDb, "news", id));
    } catch (e) {
      console.error(e);
    }
  };

  const addMap = async (name) => {
    await salvarNoFirebase("maps", { id: generateId(), name, isActive: true });
  };

  const toggleMapStatus = async (id) => {
    const m = db.maps.find((x) => x.id === id);
    if (m)
      await updateDoc(doc(firebaseDb, "maps", id), { isActive: !m.isActive });
  };

  const removeMap = async (id) => {
    try {
      await deleteDoc(doc(firebaseDb, "maps", id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-400 selection:text-black flex flex-col">
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={handleLogoClick}
          >
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <Swords
                className="text-black group-hover:rotate-12 transition-transform duration-300"
                size={24}
              />
            </div>
            <span className="text-2xl font-black tracking-tighter italic text-white group-hover:text-amber-400 transition-colors drop-shadow-lg">
              {db.settings.siteName || "MVL"}
            </span>
          </div>
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-2">
            <button
              onClick={() => setView("home")}
              className={`flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shrink-0 ${
                view === "home"
                  ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Home size={14} className="hidden sm:block" /> Início
            </button>
            <button
              onClick={() => setView("teams")}
              className={`flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shrink-0 ${
                view === "teams"
                  ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Shield size={14} className="hidden sm:block" /> Equipes
            </button>
            <button
              onClick={() => setView("players")}
              className={`flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shrink-0 ${
                view === "players"
                  ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users size={14} className="hidden sm:block" /> Atletas
            </button>
            <button
              onClick={() => setView("playoffs")}
              className={`flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shrink-0 ${
                view === "playoffs"
                  ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers size={14} className="hidden sm:block" /> Playoffs
            </button>
            <button
              onClick={() => setView("market")}
              className={`flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shrink-0 ${
                view === "market"
                  ? "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Briefcase size={14} className="hidden sm:block" /> Mercado
            </button>
            <button
              onClick={() => setView("store")}
              className={`flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shrink-0 ${
                view === "store"
                  ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShoppingCart size={14} className="hidden sm:block" /> Loja VIP
            </button>
            <button
              onClick={() => setView("ranking")}
              className={`flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shrink-0 ${
                view === "ranking"
                  ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TrendingUp size={14} className="hidden sm:block" /> Ranking
            </button>
            <button
              onClick={() => setView("matches")}
              className={`flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shrink-0 ${
                view === "matches"
                  ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <HistoryIcon size={14} className="hidden sm:block" /> Partidas
            </button>
          </div>
        </div>
      </nav>

      {showLogin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 p-10 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            <h2 className="text-3xl font-black text-white mb-8 uppercase flex items-center justify-center gap-3 tracking-tight">
              <Lock className="text-amber-400" size={28} /> Acesso Restrito
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="password"
                placeholder="Senha de Acesso"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 text-white text-center text-xl tracking-[0.5em] focus:border-amber-400 outline-none transition-all placeholder:tracking-normal placeholder:text-slate-600 shadow-inner"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                autoFocus
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 bg-slate-800 text-slate-300 font-bold py-4 rounded-xl uppercase text-sm hover:bg-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold py-4 rounded-xl uppercase text-sm hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="pt-20 flex-grow flex flex-col">
        {view === "home" && <Hero champion={champion} settings={db.settings} />}
        <div className="max-w-7xl mx-auto px-6 py-12 w-full flex-grow">
          {view === "home" && (
            <div className="space-y-16 animate-fadeIn pb-8">
              {/* Banner do Split Ativo Redesenhado */}
              {activeSplit ? (
                <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-slate-900 to-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-2xl relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_0_20px_rgba(251,191,36,0.5)]"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h3 className="text-amber-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 flex items-center justify-center md:justify-start gap-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                      Competição Ativa
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight flex flex-wrap items-center justify-center md:justify-start gap-3">
                      {activeSplit.name}
                      <span className="text-sm border border-amber-500/30 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-lg align-middle shadow-inner">
                        Formato {activeSplit.format === "cxc" ? "CxC" : "MIX"}
                      </span>
                    </h2>
                  </div>
                  <div className="mt-8 md:mt-0 relative z-10 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setView("ranking")}
                      className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-3.5 rounded-xl font-black uppercase text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                    >
                      <Trophy size={18} /> Ver Tabela Atual
                    </button>
                    <button
                      onClick={() => setView("market")}
                      className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-amber-500/50 px-8 py-3.5 rounded-xl font-bold uppercase text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <DollarSign size={18} className="text-green-400" />{" "}
                      Acessar Mercado
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 bg-slate-900/50 rounded-3xl border border-slate-800 text-center text-slate-500 font-mono text-sm uppercase tracking-widest shadow-inner flex flex-col items-center gap-4">
                  <Clock size={32} className="opacity-20" />
                  Aguardando o início de uma nova temporada
                </div>
              )}

              {/* NOVA SEÇÃO: APRESENTAÇÃO DA LIGA */}
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none"></div>
                <div className="text-center mb-12 relative z-10">
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                    Eleve seu nível de jogo
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                    A <span className="text-amber-400 font-bold">MVL</span> não
                    é apenas um torneio. É um ecossistema completo de eSports.
                    Nós transformamos jogadores casuais em atletas com economia
                    real, contratos, mercado de transferências e estatísticas
                    avançadas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {/* Card 1 */}
                  <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-colors group shadow-lg">
                    <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
                      <Swords size={28} />
                    </div>
                    <h4 className="text-white font-black text-xl mb-3 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                      Formatos Épicos
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Dispute a glória em torneios MIX balanceados por
                      inteligência ou monte sua própria panela no implacável
                      formato Clã vs Clã.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 hover:border-green-500/50 transition-colors group shadow-lg">
                    <div className="w-14 h-14 bg-green-500/10 text-green-400 rounded-2xl flex items-center justify-center mb-6 border border-green-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner">
                      <DollarSign size={28} />
                    </div>
                    <h4 className="text-white font-black text-xl mb-3 uppercase tracking-tight group-hover:text-green-400 transition-colors">
                      Mercado da Bala
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Seu passe de mercado valoriza conforme seu K/D. Assine
                      contratos, receba propostas, pague multas rescisórias ou
                      sofra uma compra hostil!
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition-colors group shadow-lg">
                    <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
                      <Handshake size={28} />
                    </div>
                    <h4 className="text-white font-black text-xl mb-3 uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                      Patrocínios Reais
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Assine com marcas reais para o seu Clã. Cumpra metas de
                      vitórias para não perder o contrato e gerencie o caixa
                      para não falir pagando salários.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 hover:border-purple-500/50 transition-colors group shadow-lg">
                    <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner">
                      <TrendingUp size={28} />
                    </div>
                    <h4 className="text-white font-black text-xl mb-3 uppercase tracking-tight group-hover:text-purple-400 transition-colors">
                      Status de Pro
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Tenha seu próprio perfil público detalhado com seu Tier,
                      KD geral, taxa de vitória, mapas favoritos, evolução
                      histórica e troféus.
                    </p>
                  </div>
                </div>
              </div>

              {/* NOTÍCIAS (Agora Ocupando a Tela Inteira) */}
              <div className="pt-10 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase flex items-center gap-3 tracking-tight">
                      <Newspaper className="text-amber-400" size={32} /> Central
                      de Notícias
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      Acompanhe as últimas notícias, transferências e resultados
                      da liga.
                    </p>
                  </div>
                </div>
                <NewsSection news={db.news} />
              </div>
            </div>
          )}
          {view === "admin" && (
            <AdminPanel
              data={db}
              onAddSponsor={addSponsor}
              onUpdateSponsor={updateSponsor}
              onDeleteSponsor={deleteSponsor}
              onAddPlayer={addPlayer}
              onUpdatePlayer={updatePlayer}
              onUpdateContract={updateContract}
              onRemovePlayer={removePlayer}
              onPausePlayer={pausePlayer}
              onBanPlayer={banPlayer}
              onUnbanPlayer={unbanPlayer}
              onAddSplit={addSplit}
              onUpdateSplit={updateSplit}
              onEndSplit={endSplit}
              onSaveMatch={saveMatch}
              onDeleteMatch={deleteMatch}
              onAddNews={addNews}
              onRemoveNews={removeNews}
              onAddMap={addMap}
              onToggleMap={toggleMapStatus}
              onRemoveMap={removeMap}
              onAddChampionship={addChampionship}
              onUpdateChampionship={updateChampionship}
              onRemoveChampionship={removeChampionship}
              onUpdateSettings={updateSettings}
              onMenuOrderChange={updateAdminMenuOrder}
              onAddSeries={addSeries}
              onUpdateSeries={updateSeries}
              onDeleteSeries={deleteSeries}
              onAddClan={addClan}
              onUpdateClan={updateClan}
              onDeleteClan={deleteClan}
              onAssignPlayerToClan={assignPlayerToClan}
              onRemovePlayerFromClan={removePlayerFromClan}
              onTransferPlayer={transferPlayer}
              onUpdateClanFinancials={updateClanFinancials}
              onHome={() => setView("home")}
              onLogout={handleLogout}
              onToggleClanEnrollment={handleToggleClanEnrollment}
              onGenerateGroupStage={handleGenerateGroupStage}
              onGeneratePlayoffs={handleGeneratePlayoffs}
              onUndoGroupStage={handleUndoGroupStage}
              onUndoPlayoffs={handleUndoPlayoffs}
              onGenerateMixTournament={handleGenerateMixTournament}
              onToggleMarketStatus={toggleMarketStatus}
              onApplySoftReset={applyMarketSoftReset}
              onAddStoreItem={addStoreItem}
              onDeleteStoreItem={deleteStoreItem}
              onUpdateStoreItem={updateStoreItem}
              onSellStoreItem={sellItemToPlayer}
            />
          )}
          {view === "teams" && (
            <TeamsPage
              clans={db.clans}
              players={db.players}
              sponsors={db.sponsors}
              backend={backend}
              onPlayerClick={goToProfile}
            />
          )}
          {view === "players" && (
            <PlayersPage
              players={db.players}
              clans={db.clans}
              backend={backend}
              onPlayerClick={goToProfile}
            />
          )}
          {view === "playoffs" && (
            <PlayoffsPage data={db} activeSplit={activeSplit} />
          )}
          {view === "ranking" && (
            <div className="animate-fadeIn">
              {activeSplit?.format === "cxc" ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ClanStandingsTable
                    data={backend.getClanStandings(activeSplit.id)}
                  />
                  <div className="space-y-8">
                    <TitleRace
                      ranking={splitRanking}
                      onPlayerClick={goToProfile}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <RankingTable
                      data={globalRanking}
                      title="Ranking Geral Histórico"
                      isGlobal
                      onPlayerClick={goToProfile}
                    />
                  </div>
                  <div className="space-y-8">
                    <TitleRace
                      ranking={splitRanking}
                      onPlayerClick={goToProfile}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {view === "market" && (
            <MarketPage data={db} onPlayerClick={goToProfile} />
          )}
          {view === "store" && (
            <StorePage items={db.items || []} players={db.players} />
          )}
          {view === "matches" && <MatchHistorySection data={db} />}
          {view === "profile" && selectedProfileData && (
            <PlayerProfile
              profileData={selectedProfileData}
              data={db}
              onBack={() => setView("ranking")}
            />
          )}
        </div>
        <footer className="bg-slate-950 border-t border-slate-900 py-16 text-center mt-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent opacity-50"></div>
          <div className="relative z-10">
            <Swords className="mx-auto text-slate-700 mb-4" size={32} />
            <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] hover:text-amber-500 transition-colors cursor-default">
              {db.settings.siteName || "MVL"} - Match Vanguard League &copy;
              2024
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
