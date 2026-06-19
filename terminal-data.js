// terminal-data.js — Données du mode Terminal (shells simulés, scénarios guidés)
// Séparé de data.js pour isoler le contenu du terminal des fiches de révision.
// Chargé AVANT script.js dans index.html.

// ═══════════════════════════════════════════
// TERMINAL SIMULÉ
// ═══════════════════════════════════════════
const TERM_SHELLS = {
  linux: {
    label: "🐧 Linux/Bash",
    prompt: "user@linux:~$",
    color: "#86efac",
    intro: [
      {t:"ok", s:"Bienvenue dans le terminal Linux simulé !"},
      {t:"info", s:"Tape 'help' pour voir les commandes disponibles."}
    ],
    commands: {
      "help": () => [
        {t:"head",s:"=== COMMANDES DISPONIBLES ==="},
        {t:"ok",s:"Navigation : ls, pwd, cd, cat, find, grep"},
        {t:"ok",s:"Réseau : ip a, ip r, ss -tulnp, ping, dig, nmap, netstat"},
        {t:"ok",s:"Processus : ps aux, top, kill, nice"},
        {t:"ok",s:"Sécurité : chmod, chown, sudo -l, last, lastb"},
        {t:"ok",s:"Services : systemctl status/start/stop/enable"},
        {t:"ok",s:"Logs : tail -f, journalctl, grep"},
        {t:"ok",s:"Forensique : find -perm -4000, sha256sum, lsof, history"},
        {t:"ok",s:"Paquets : apt update, apt install, dpkg -l"},
        {t:"ok",s:"LVM : pvs, vgs, lvs"},
        {t:"ok",s:"Multi-distro : apk add/update (Alpine), pacman -Syu/-S (Arch), dnf install (CentOS/RHEL), rc-service (OpenRC)"},
        {t:"ok",s:"Autres : uname, uptime, df -h, free -h, whoami, id, env"},
        {t:"info",s:"Tape 'clear' pour vider l'écran."}
      ],
      "ls": () => [{t:"ok",s:"total 48"},{t:"ok",s:"drwxr-xr-x 2 user user 4096 jun 12 09:00 Documents"},{t:"ok",s:"drwxr-xr-x 2 user user 4096 jun 12 08:30 Downloads"},{t:"ok",s:"-rw-r--r-- 1 user user  220 jun 12 08:00 .bash_profile"},{t:"ok",s:"-rw-r--r-- 1 user user 3526 jun 12 08:00 .bashrc"},{t:"ok",s:"-rw------- 1 user user  128 jun 12 09:15 .bash_history"}],
      "ls -la": () => [{t:"ok",s:"total 64"},{t:"ok",s:"drwxr-xr-x 5 user user 4096 jun 12 09:00 ."},{t:"ok",s:"drwxr-xr-x 3 root root 4096 jun 12 07:00 .."},{t:"ok",s:"drwxr-xr-x 2 user user 4096 jun 12 08:30 Documents"},{t:"ok",s:"drwx------ 2 user user 4096 jun 12 08:00 .ssh"},{t:"ok",s:"-rw------- 1 user user  128 jun 12 09:15 .bash_history"}],
      "pwd": () => [{t:"ok",s:"/home/user"}],
      "whoami": () => [{t:"ok",s:"user"}],
      "id": () => [{t:"ok",s:"uid=1000(user) gid=1000(user) groupes=1000(user),4(adm),24(cdrom),27(sudo),100(users)"}],
      "uname -a": () => [{t:"ok",s:"Linux kali 6.1.0-18-amd64 #1 SMP Debian 6.1.76 x86_64 GNU/Linux"}],
      "uptime": () => [{t:"ok",s:" 09:15:42 up 2 days,  3:22,  2 users,  load average: 0.12, 0.08, 0.03"}],
      "env": () => [{t:"ok",s:"SHELL=/bin/bash"},{t:"ok",s:"HOME=/home/user"},{t:"ok",s:"USER=user"},{t:"ok",s:"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"},{t:"ok",s:"TERM=xterm-256color"},{t:"ok",s:"LANG=fr_FR.UTF-8"}],
      "ip a": () => [{t:"ok",s:"1: lo: <LOOPBACK,UP,LOWER_UP>"},{t:"ok",s:"    inet 127.0.0.1/8 scope host lo"},{t:"ok",s:"2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>"},{t:"ok",s:"    link/ether 00:0c:29:ab:cd:ef brd ff:ff:ff:ff:ff:ff"},{t:"ok",s:"    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0"},{t:"ok",s:"    inet6 fe80::20c:29ff:feab:cdef/64 scope link"}],
      "ip r": () => [{t:"ok",s:"default via 192.168.1.1 dev eth0 proto dhcp metric 100"},{t:"ok",s:"192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100"}],
      "ip link": () => [{t:"ok",s:"1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN"},{t:"ok",s:"2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP"}],
      "ss -tulnp": () => [{t:"ok",s:"Netid  State   Recv-Q  Send-Q  Local Address:Port"},{t:"ok",s:"tcp    LISTEN  0       128     0.0.0.0:22     0.0.0.0:*    users:((\"sshd\",pid=1234))"},{t:"ok",s:"tcp    LISTEN  0       5       0.0.0.0:80     0.0.0.0:*    users:((\"nginx\",pid=5678))"},{t:"ok",s:"tcp    LISTEN  0       128     0.0.0.0:443    0.0.0.0:*    users:((\"nginx\",pid=5678))"},{t:"ok",s:"udp    UNCONN  0       0       0.0.0.0:53     0.0.0.0:*    users:((\"dnsmasq\",pid=900))"}],
      "ss -tp": () => [{t:"ok",s:"State     Recv-Q  Send-Q  Local Address:Port          Peer Address:Port"},{t:"ok",s:"ESTAB     0       0       192.168.1.100:22           192.168.1.10:50234  users:((\"sshd\",pid=2001))"},{t:"ok",s:"ESTAB     0       0       192.168.1.100:443          93.184.216.34:41290 users:((\"nginx\",pid=5678))"}],
      "netstat -tulnp": () => [{t:"warn",s:"AVERTISSEMENT: netstat est déprécié. Utilisez 'ss -tulnp' à la place."},{t:"ok",s:"Proto Recv-Q Send-Q Local Address    Foreign Address  State  PID/Prog"},{t:"ok",s:"tcp   0      0      0.0.0.0:22       0.0.0.0:*        LISTEN 1234/sshd"},{t:"ok",s:"tcp   0      0      0.0.0.0:80       0.0.0.0:*        LISTEN 5678/nginx"}],
      "ping": () => [{t:"warn",s:"Usage: ping -c 4 <IP>"}],
      "ping -c 4 8.8.8.8": () => [{t:"ok",s:"PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data."},{t:"ok",s:"64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=12.3 ms"},{t:"ok",s:"64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=11.8 ms"},{t:"ok",s:"64 bytes from 8.8.8.8: icmp_seq=3 ttl=118 time=12.1 ms"},{t:"ok",s:"64 bytes from 8.8.8.8: icmp_seq=4 ttl=118 time=12.5 ms"},{t:"ok",s:"--- 8.8.8.8 ping statistics ---"},{t:"ok",s:"4 packets transmitted, 4 received, 0% packet loss, time 3004ms"},{t:"ok",s:"rtt min/avg/max = 11.8/12.2/12.5 ms"}],
      "dig domaine.fr A +short": () => [{t:"ok",s:"217.70.184.38"}],
      "dig google.com A +short": () => [{t:"ok",s:"142.250.74.174"}],
      "nmap -sV 192.168.1.1": () => [{t:"ok",s:"Starting Nmap 7.94 ( https://nmap.org )"},{t:"ok",s:"Nmap scan report for 192.168.1.1"},{t:"ok",s:"PORT   STATE SERVICE VERSION"},{t:"ok",s:"22/tcp open  ssh     OpenSSH 8.9 (protocol 2.0)"},{t:"ok",s:"80/tcp open  http    nginx 1.24.0"},{t:"ok",s:"443/tcp open ssl/http nginx 1.24.0"},{t:"ok",s:"Service detection performed. 3 services on 192.168.1.1"}],
      "ps aux": () => [{t:"ok",s:"USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"},{t:"ok",s:"root         1  0.0  0.1 169076 10832 ?        Ss   07:00   0:01 /sbin/init"},{t:"ok",s:"root      1234  0.0  0.0  72300  6172 ?        Ss   07:01   0:00 sshd: /usr/sbin/sshd"},{t:"ok",s:"user      2001  0.0  0.1  76220  9328 pts/0    Ss   09:00   0:00 -bash"},{t:"ok",s:"root      5678  0.0  0.1  79456  8764 ?        Ss   07:02   0:00 nginx: master process"}],
      "ps aux | grep nginx": () => [{t:"ok",s:"root  5678  0.0  0.1  79456  8764 ?   Ss  07:02  0:00 nginx: master process /etc/nginx/nginx.conf"},{t:"ok",s:"www-d 5679  0.0  0.1  79912  7832 ?   S   07:02  0:00 nginx: worker process"}],
      "top": () => [{t:"ok",s:"top - 09:15:42 up 2 days,  3:22,  2 users,  load: 0.12, 0.08, 0.03"},{t:"ok",s:"Tasks: 142 total,   1 running, 141 sleeping"},{t:"ok",s:"%Cpu(s):  2.3 us,  0.5 sy,  0.0 ni, 96.8 id"},{t:"ok",s:"MiB Mem :   7876.5 total,   4231.2 free,   2104.8 used"},{t:"info",s:"(simulation — 'top' interactif non disponible dans ce terminal)"}],
      "free -h": () => [{t:"ok",s:"              total        used        free      shared  buff/cache   available"},{t:"ok",s:"Mem:           7.7Gi       2.1Gi       4.1Gi       156Mi       1.5Gi       5.3Gi"},{t:"ok",s:"Swap:          2.0Gi          0B       2.0Gi"}],
      "df -h": () => [{t:"ok",s:"Filesystem      Size  Used Avail Use% Mounted on"},{t:"ok",s:"/dev/sda1        40G   12G   26G  32% /"},{t:"ok",s:"tmpfs           3.9G     0  3.9G   0% /dev/shm"},{t:"ok",s:"/dev/sdb1       100G   45G   55G  45% /data"}],
      "du -sh /var/log/*": () => [{t:"ok",s:"4.0K\t/var/log/auth.log"},{t:"ok",s:"12K\t/var/log/syslog"},{t:"ok",s:"1.2M\t/var/log/nginx"},{t:"ok",s:"256K\t/var/log/dpkg.log"}],
      "chmod 750 fichier": () => [{t:"ok",s:"Droits appliqués : rwxr-x--- (propriétaire=rwx, groupe=r-x, autres=---)"}],
      "chmod 777 fichier": () => [{t:"warn",s:"⚠️  MAUVAISE PRATIQUE : chmod 777 donne tous les droits à tout le monde !"},{t:"warn",s:"Ne jamais utiliser en production. Préférez 750 ou 640."}],
      "chown user:group fichier": () => [{t:"ok",s:"Propriétaire changé vers user:group"}],
      "sudo -l": () => [{t:"ok",s:"Matching Defaults entries for user on linux:"},{t:"ok",s:"    env_reset, mail_badpass"},{t:"ok",s:"User user may run the following commands on linux:"},{t:"ok",s:"    (ALL : ALL) ALL"}],
      "last": () => [{t:"ok",s:"user     pts/0        192.168.1.10     Mon jun 12 09:00   still logged in"},{t:"ok",s:"user     pts/0        192.168.1.10     Sun jun 11 14:32 - 18:45  (04:12)"},{t:"ok",s:"reboot   system boot  6.1.0-18-amd64   Sat jun 10 06:00"}],
      "lastb": () => [{t:"ok",s:"root     ssh:notty    45.33.32.156     Mon jun 12 08:45 - 08:45  (00:00)"},{t:"ok",s:"admin    ssh:notty    178.62.43.89     Mon jun 12 08:43 - 08:43  (00:00)"},{t:"warn",s:"ℹ️  Des tentatives de bruteforce SSH ont été détectées. Envisagez fail2ban."}],
      "systemctl status nginx": () => [{t:"ok",s:"● nginx.service - A high performance web server"},{t:"ok",s:"     Loaded: loaded (/lib/systemd/system/nginx.service; enabled)"},{t:"ok",s:"     Active: active (running) since Mon 2024-06-10 07:02:15 UTC"},{t:"ok",s:"    Process: 5678 ExecStart=/usr/sbin/nginx"},{t:"ok",s:"   Main PID: 5678 (nginx)"},{t:"ok",s:"jun 10 07:02:15 linux nginx[5678]: nginx: the configuration file ...syntax is ok"}],
      "systemctl status sshd": () => [{t:"ok",s:"● sshd.service - OpenBSD Secure Shell server"},{t:"ok",s:"     Active: active (running) since Mon 2024-06-10 07:01:00 UTC"},{t:"ok",s:"    Process: 1234 ExecStart=/usr/sbin/sshd -D"},{t:"ok",s:"   Main PID: 1234 (sshd)"}],
      "systemctl list-units --type=service --state=failed": () => [{t:"ok",s:"UNIT                  LOAD   ACTIVE SUB    DESCRIPTION"},{t:"warn",s:"mysql.service         loaded failed failed MySQL Database"},{t:"ok",s:""},{t:"ok",s:"LOAD   = Reflects whether the unit definition was properly loaded."},{t:"ok",s:"ACTIVE = The high-level unit activation state."},{t:"ok",s:"1 unit listed. Pass --all to see loaded but inactive units."}],
      "journalctl -u sshd -n 20": () => [{t:"ok",s:"jun 12 09:00:01 linux sshd[2001]: Accepted publickey for user from 192.168.1.10"},{t:"warn",s:"jun 12 08:45:32 linux sshd[2888]: Failed password for root from 45.33.32.156"},{t:"warn",s:"jun 12 08:45:30 linux sshd[2887]: Failed password for root from 45.33.32.156"},{t:"ok",s:"jun 12 08:40:01 linux sshd[2001]: Accepted publickey for user from 192.168.1.10"}],
      "journalctl -p err -b": () => [{t:"err",s:"jun 12 07:03:12 linux kernel: EXT4-fs error (device sda1): ...checksum"},{t:"warn",s:"jun 12 07:02:55 linux systemd[1]: mysql.service: Main process exited, code=exited"},{t:"err",s:"jun 12 07:02:55 linux systemd[1]: mysql.service: Failed with result 'exit-code'"}],
      "tail -f /var/log/auth.log": () => [{t:"ok",s:"jun 12 09:00:01 linux sshd[2001]: Accepted publickey for user"},{t:"ok",s:"jun 12 09:01:22 linux sudo: user : TTY=pts/0 ; COMMAND=/bin/bash"},{t:"info",s:"(simulation — flux en temps réel non disponible)"}],
      "grep 'Failed password' /var/log/auth.log": () => [{t:"warn",s:"jun 12 08:45:32 linux sshd: Failed password for root from 45.33.32.156 port 52341"},{t:"warn",s:"jun 12 08:45:30 linux sshd: Failed password for admin from 45.33.32.156 port 52340"},{t:"warn",s:"jun 12 08:43:11 linux sshd: Failed password for root from 178.62.43.89 port 41029"},{t:"info",s:"3 tentatives détectées — recommandé: configurer fail2ban"}],
      "find / -perm -4000 -type f 2>/dev/null": () => [{t:"warn",s:"=== Fichiers SUID trouvés ==="},  {t:"ok",s:"/usr/bin/sudo"},{t:"ok",s:"/usr/bin/passwd"},{t:"ok",s:"/usr/bin/su"},{t:"ok",s:"/usr/bin/ping"},{t:"warn",s:"/tmp/suspicious_suid"},{t:"warn",s:"⚠️  /tmp/suspicious_suid est suspect ! Un fichier SUID dans /tmp = compromission possible."}],
      "sha256sum /bin/bash": () => [{t:"ok",s:"5a8ea5cbeb77f3e77073e34f02e16f47e83e63b6e0399f8a9d4e7b5f23e4b12c  /bin/bash"}],
      "history": () => [{t:"ok",s:"  1  sudo apt update"},{t:"ok",s:"  2  sudo apt install nginx"},{t:"ok",s:"  3  systemctl start nginx"},{t:"ok",s:"  4  ss -tulnp"},{t:"ok",s:"  5  ip a"},{t:"ok",s:"  6  history"}],
      "pvs": () => [{t:"ok",s:"  PV         VG      Fmt  Attr PSize   PFree"},{t:"ok",s:"  /dev/sdb1  vg_data lvm2 a--  100.00g  55.00g"}],
      "vgs": () => [{t:"ok",s:"  VG      #PV #LV #SN Attr   VSize   VFree"},{t:"ok",s:"  vg_data   1   2   0 wz--n- 100.00g 55.00g"}],
      "lvs": () => [{t:"ok",s:"  LV      VG      Attr       LSize   Pool Origin"},{t:"ok",s:"  lv_data vg_data -wi-ao---- 30.00g"},{t:"ok",s:"  lv_logs vg_data -wi-ao---- 15.00g"}],
      "apt update": () => [{t:"ok",s:"Atteint:1 http://security.ubuntu.com/ubuntu jammy-security InRelease"},{t:"ok",s:"Atteint:2 http://fr.archive.ubuntu.com/ubuntu jammy InRelease"},{t:"ok",s:"Lecture des listes de paquets... Fait"},{t:"ok",s:"Construction de l'arbre des dépendances... Fait"},{t:"ok",s:"17 packages can be upgraded. Run 'apt list --upgradable'."}],
      "apt install nmap -y": () => [{t:"ok",s:"Lecture des listes de paquets..."},{t:"ok",s:"Construction de l'arbre des dépendances..."},{t:"ok",s:"Les NOUVEAUX paquets suivants seront installés : nmap nmap-common"},{t:"ok",s:"0 mis à jour, 2 nouvellement installés, 0 à enlever"},{t:"ok",s:"Téléchargement de nmap 7.94_1_amd64.deb..."},{t:"ok",s:"Traitement de nmap (7.94-1) ..."},{t:"ok",s:"nmap installé avec succès."}],
      "dpkg -l | grep nginx": () => [{t:"ok",s:"ii  nginx          1.24.0-1ubuntu1  amd64  small, powerful, scalable web/proxy server"}],
      "ufw status verbose": () => [{t:"ok",s:"Status: active"},{t:"ok",s:"Logging: on (low)"},{t:"ok",s:"Default: deny (incoming), allow (outgoing)"},{t:"ok",s:""},{t:"ok",s:"To                         Action      From"},{t:"ok",s:"22/tcp                     ALLOW IN    Anywhere"},{t:"ok",s:"80/tcp                     ALLOW IN    Anywhere"},{t:"ok",s:"443/tcp                    ALLOW IN    Anywhere"}],
      "iptables -L -n -v": () => [{t:"ok",s:"Chain INPUT (policy DROP 0 packets, 0 bytes)"},{t:"ok",s:" pkts bytes target  prot opt  source     destination"},{t:"ok",s:"  120  8640 ACCEPT  tcp  --   0.0.0.0/0  0.0.0.0/0   tcp dpt:22"},{t:"ok",s:"  850 61200 ACCEPT  tcp  --   0.0.0.0/0  0.0.0.0/0   tcp dpt:80"},{t:"ok",s:"Chain FORWARD (policy DROP)"},{t:"ok",s:"Chain OUTPUT (policy ACCEPT)"}],
      "dmesg | tail -10": () => [{t:"ok",s:"[    0.000000] Linux version 6.1.0-18-amd64"},{t:"ok",s:"[    1.234567] eth0: renamed from enp3s0"},{t:"ok",s:"[    2.345678] EXT4-fs (sda1): mounted filesystem"},{t:"ok",s:"[86421.234567] device eth0 entered promiscuous mode"}],
      "cat /etc/passwd": () => [{t:"ok",s:"root:x:0:0:root:/root:/bin/bash"},{t:"ok",s:"daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin"},{t:"ok",s:"www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin"},{t:"ok",s:"user:x:1000:1000:user,,,:/home/user:/bin/bash"}],
      "cat /etc/shadow": () => [{t:"err",s:"cat: /etc/shadow: Permission denied"},{t:"warn",s:"ℹ️  Utilisez 'sudo cat /etc/shadow' — le fichier est lisible par root uniquement."}],
      "fail2ban-client status sshd": () => [{t:"ok",s:"Status for the jail: sshd"},{t:"ok",s:"|- Filter: Currently failed: 3 | Total failed: 47"},{t:"ok",s:"`- Actions: Currently banned: 2 | Total banned: 5"},{t:"ok",s:"   Banned IP list: 45.33.32.156  178.62.43.89"}],
      "ssh-keygen -t ed25519": () => [{t:"ok",s:"Generating public/private ed25519 key pair."},{t:"ok",s:"Enter file in which to save the key (/home/user/.ssh/id_ed25519):"},{t:"ok",s:"Your identification has been saved in /home/user/.ssh/id_ed25519"},{t:"ok",s:"Your public key has been saved in /home/user/.ssh/id_ed25519.pub"},{t:"ok",s:"The key fingerprint is: SHA256:abc123def456 user@linux"},{t:"info",s:"✅ Clé Ed25519 générée — bien meilleure que RSA 2048 !"}],
      "apk update": () => [{t:"ok",s:"fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/main/x86_64/APKINDEX.tar.gz"},{t:"ok",s:"fetch https://dl-cdn.alpinelinux.org/alpine/v3.19/community/x86_64/APKINDEX.tar.gz"},{t:"ok",s:"v3.19.1-114-g2c1d3e [https://dl-cdn.alpinelinux.org/alpine/v3.19/main]"},{t:"ok",s:"OK: 22839 distinct packages available"}],
      "apk add nginx": () => [{t:"ok",s:"(1/5) Installing pcre2 (10.42-r1)"},{t:"ok",s:"(2/5) Installing nginx (1.24.0-r7)"},{t:"ok",s:"Executing nginx-1.24.0-r7.pre-install"},{t:"ok",s:"OK: 12 MiB in 18 packages"}],
      "rc-service nginx start": () => [{t:"ok",s:" * Starting nginx ..."},{t:"ok",s:" * start-stop-daemon: nginx started [  ok ]"},{t:"info",s:"ℹ️  Alpine utilise OpenRC, pas systemd — pas de 'systemctl' ici."}],
      "rc-update add nginx default": () => [{t:"ok",s:" * service nginx added to runlevel default"}],
      "pacman -Syu": () => [{t:"ok",s:":: Synchronizing package databases..."},{t:"ok",s:" core                  130.2 KiB"},{t:"ok",s:" extra                  1780.4 KiB"},{t:"ok",s:":: Starting full system upgrade..."},{t:"ok",s:"resolving dependencies..."},{t:"ok",s:" there is nothing to do"}],
      "pacman -S htop": () => [{t:"ok",s:"resolving dependencies..."},{t:"ok",s:"Packages (1) htop-3.3.0-1"},{t:"ok",s:"Total Installed Size:  0.20 MiB"},{t:"ok",s:":: Proceed with installation? [Y/n]"},{t:"ok",s:"(1/1) installing htop"}],
      "dnf install httpd -y": () => [{t:"ok",s:"Last metadata expiration check: 0:12:34 ago."},{t:"ok",s:"Dependencies resolved."},{t:"ok",s:"Installing: httpd  2.4.57-5.el9  (appstream)"},{t:"ok",s:"Installed:  httpd-2.4.57-5.el9.x86_64"},{t:"ok",s:"Complete!"}],
      "systemctl enable --now firewalld": () => [{t:"ok",s:"Created symlink /etc/systemd/system/multi-user.target.wants/firewalld.service → /usr/lib/systemd/system/firewalld.service."},{t:"ok",s:"firewalld.service actif (running)"}],
      "rpm -qa | grep httpd": () => [{t:"ok",s:"httpd-2.4.57-5.el9.x86_64"},{t:"ok",s:"httpd-tools-2.4.57-5.el9.x86_64"}],
    }
  },
  cisco: {
    label: "🔵 Cisco IOS",
    prompt: "Router#",
    color: "#60a5fa",
    intro: [
      {t:"ok", s:"Bienvenue dans le simulateur Cisco IOS !"},
      {t:"info", s:"Mode privileged EXEC actif. Tape 'help' pour les commandes."}
    ],
    commands: {
      "help": () => [
        {t:"head",s:"=== COMMANDES CISCO IOS DISPONIBLES ==="},
        {t:"ok",s:"Vérification : show version, show run, show start, show ip int brief"},
        {t:"ok",s:"VLAN/Switch : show vlan brief, show interfaces trunk, show mac address-table"},
        {t:"ok",s:"Routage : show ip route, show ip protocols, show ip ospf neighbor"},
        {t:"ok",s:"Sécurité : show ip nat translations, show crypto ipsec sa, show access-lists"},
        {t:"ok",s:"Diagnostic : ping, traceroute, show arp, show cdp neighbors"},
        {t:"ok",s:"STP : show spanning-tree, show etherchannel summary"},
        {t:"ok",s:"QoS/HSRP : show policy-map interface, show standby"},
        {t:"info",s:"Tape une commande pour voir sa sortie simulée."}
      ],
      "show version": () => [{t:"ok",s:"Cisco IOS Software, Version 15.7(3)M5, RELEASE SOFTWARE"},{t:"ok",s:"ROM: System Bootstrap, Version 15.7(3)M5"},{t:"ok",s:"Router uptime is 4 days, 6 hours, 12 minutes"},{t:"ok",s:"System image file is 'flash:c2900-universalk9-mz.SPA.157-3.M5.bin'"},{t:"ok",s:"cisco CISCO2911/K9 (revision 1.0) with 491520K/32768K bytes of memory."},{t:"ok",s:"1 Gigabit Ethernet interface"},{t:"ok",s:"1 ATM interface"},{t:"ok",s:"Cisco IOS Software License is: advipservicesk9"}],
      "show running-config": () => [{t:"ok",s:"Building configuration..."},{t:"ok",s:""},{t:"ok",s:"Current configuration : 2847 bytes"},{t:"ok",s:"!"},{t:"ok",s:"version 15.7"},{t:"ok",s:"service password-encryption"},{t:"ok",s:"!"},{t:"ok",s:"hostname Router"},{t:"ok",s:"!"},{t:"ok",s:"enable secret 5 $1$mERr$IimqM7V3gCkf6lQiuUy2A."},{t:"ok",s:"!"},{t:"ok",s:"ip domain-name lab.local"},{t:"ok",s:"ip ssh version 2"}],
      "show ip interface brief": () => [{t:"ok",s:"Interface            IP-Address      OK? Method Status   Protocol"},{t:"ok",s:"GigabitEthernet0/0   192.168.1.1     YES manual up       up"},{t:"ok",s:"GigabitEthernet0/1   10.0.0.1        YES manual up       up"},{t:"ok",s:"GigabitEthernet0/2   unassigned      YES unset  down     down"},{t:"warn",s:"GigabitEthernet0/2 est DOWN/DOWN — vérifier câble ou configuration"}],
      "show ip route": () => [{t:"ok",s:"Codes: C-connected, S-static, O-OSPF, D-EIGRP, B-BGP"},{t:"ok",s:""},{t:"ok",s:"     10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks"},{t:"ok",s:"C       10.0.0.0/30 is directly connected, GigabitEthernet0/1"},{t:"ok",s:"S       10.10.10.0/24 [1/0] via 10.0.0.2"},{t:"ok",s:"O    192.168.2.0/24 [110/2] via 10.0.0.2, 00:12:34, GigabitEthernet0/1"},{t:"ok",s:"C    192.168.1.0/24 is directly connected, GigabitEthernet0/0"},{t:"ok",s:"S*   0.0.0.0/0 [1/0] via 10.0.0.254"}],
      "show ip ospf neighbor": () => [{t:"ok",s:"Neighbor ID     Pri   State       Dead Time  Address       Interface"},{t:"ok",s:"2.2.2.2           1   FULL/DR     00:00:34   10.0.0.2      GigabitEthernet0/1"},{t:"ok",s:"3.3.3.3           1   FULL/BDR    00:00:31   10.0.0.3      GigabitEthernet0/1"}],
      "show vlan brief": () => [{t:"ok",s:"VLAN Name                             Status    Ports"},{t:"ok",s:"---- -------------------------------- --------- ------"},{t:"ok",s:"1    default                          active    Gi0/0, Gi0/3"},{t:"ok",s:"10   PRODUCTION                       active    Gi0/1, Gi0/2, Gi0/4"},{t:"ok",s:"20   MANAGEMENT                       active    Gi0/5"},{t:"ok",s:"99   NATIVE                           active"}],
      "show interfaces trunk": () => [{t:"ok",s:"Port        Mode         Encapsulation  Status        Native vlan"},{t:"ok",s:"Gi0/10      on           802.1q         trunking      99"},{t:"ok",s:""},{t:"ok",s:"Port        Vlans allowed on trunk"},{t:"ok",s:"Gi0/10      10,20,99"},{t:"ok",s:""},{t:"ok",s:"Port        Vlans allowed and active in management domain"},{t:"ok",s:"Gi0/10      10,20,99"}],
      "show spanning-tree": () => [{t:"ok",s:"VLAN0010"},{t:"ok",s:"  Spanning tree enabled protocol rstp"},{t:"ok",s:"  Root ID    Priority    24586"},{t:"ok",s:"             Address     aabb.cc00.0100"},{t:"ok",s:"             This bridge is the root"},{t:"ok",s:""},{t:"ok",s:"Interface        Role Sts Cost   Prio.Nbr Type"},{t:"ok",s:"Gi0/1            Desg FWD 4      128.1    P2p"},{t:"ok",s:"Gi0/2            Desg FWD 4      128.2    P2p"}],
      "show mac address-table": () => [{t:"ok",s:"          Mac Address Table"},{t:"ok",s:"-------------------------------------------"},{t:"ok",s:"Vlan    Mac Address       Type        Ports"},{t:"ok",s:"----    -----------       --------    -----"},{t:"ok",s:"  10    0050.7966.6800   DYNAMIC     Gi0/1"},{t:"ok",s:"  10    0050.7966.6801   DYNAMIC     Gi0/2"},{t:"ok",s:"  20    aabb.cc00.0100   DYNAMIC     Gi0/10"}],
      "show ip nat translations": () => [{t:"ok",s:"Pro  Inside global   Inside local   Outside local  Outside global"},{t:"ok",s:"tcp  203.0.113.1:1234  192.168.1.10:1234  8.8.8.8:53  8.8.8.8:53"},{t:"ok",s:"tcp  203.0.113.1:5678  192.168.1.20:5678  142.250.74.174:443  142.250.74.174:443"}],
      "show arp": () => [{t:"ok",s:"Protocol  Address          Age (min)  Hardware Addr   Type   Interface"},{t:"ok",s:"Internet  192.168.1.1             -  aabb.cc00.0100  ARPA   GigabitEthernet0/0"},{t:"ok",s:"Internet  192.168.1.100           5  0050.7966.6800  ARPA   GigabitEthernet0/0"},{t:"ok",s:"Internet  192.168.1.200           2  0050.7966.6801  ARPA   GigabitEthernet0/0"}],
      "show cdp neighbors detail": () => [{t:"ok",s:"-------------------------"},{t:"ok",s:"Device ID: SW-CORE-01"},{t:"ok",s:"Entry address(es): IP address: 10.0.0.2"},{t:"ok",s:"Platform: cisco WS-C3750X-48P,  Capabilities: Switch"},{t:"ok",s:"Interface: GigabitEthernet0/0,  Port ID (outgoing port): GigabitEthernet1/0/1"},{t:"ok",s:"Version: Cisco IOS Software, Version 12.2(55)SE"}],
      "show access-lists": () => [{t:"ok",s:"Extended IP access list PROTECT-LAN"},{t:"ok",s:"    10 permit tcp 192.168.1.0 0.0.0.255 any eq 443 (50 matches)"},{t:"ok",s:"    20 permit tcp 192.168.1.0 0.0.0.255 any eq 80 (120 matches)"},{t:"ok",s:"    30 deny   tcp any any eq 23 (0 matches)"},{t:"ok",s:"    40 deny   ip 10.0.0.0 0.255.255.255 192.168.1.0 0.0.0.255 (2 matches)"},{t:"warn",s:"    999 deny   ip any any (implicit, 5 matches)"}],
      "show crypto ipsec sa": () => [{t:"ok",s:"interface: GigabitEthernet0/1"},{t:"ok",s:"    Crypto map tag: VPN-MAP, local addr 10.0.0.1"},{t:"ok",s:"   protected vrf: (none)"},{t:"ok",s:"   local  ident (addr/mask/prot/port): (192.168.1.0/255.255.255.0/0/0)"},{t:"ok",s:"   remote ident (addr/mask/prot/port): (10.10.10.0/255.255.255.0/0/0)"},{t:"ok",s:"   #pkts encaps: 1240, #pkts encrypt: 1240, #pkts digest: 1240"},{t:"ok",s:"   #pkts decaps: 980, #pkts decrypt: 980, #pkts verify: 980"}],
      "show etherchannel summary": () => [{t:"ok",s:"Flags:  D - down        P - bundled in port-channel"},{t:"ok",s:"        I - stand-alone  s - suspended"},{t:"ok",s:"        H - Hot-standby"},{t:"ok",s:""},{t:"ok",s:"Group  Port-channel  Protocol    Ports"},{t:"ok",s:"------+-------------+-----------+-------"},{t:"ok",s:"1      Po1(SU)      LACP      Gi0/1(P)  Gi0/2(P)"}],
      "show standby": () => [{t:"ok",s:"GigabitEthernet0/0 - Group 1"},{t:"ok",s:"  State is Active"},{t:"ok",s:"    1 state change, last state change 04:12:34"},{t:"ok",s:"  Virtual IP address is 192.168.1.254"},{t:"ok",s:"  Active virtual MAC address is 0000.0c07.ac01"},{t:"ok",s:"  Local virtual MAC address is 0000.0c07.ac01 (default)"},{t:"ok",s:"  Hello time 3 sec, hold time 10 sec"},{t:"ok",s:"  Standby router is 192.168.1.2, priority 90"}],
      "show policy-map interface GigabitEthernet0/1": () => [{t:"ok",s:"GigabitEthernet0/1"},{t:"ok",s:"  Service-policy output: QOS-WAN"},{t:"ok",s:""},{t:"ok",s:"    Class-map: VOIX (match-all)"},{t:"ok",s:"      5 minute offered rate 128000 bps, drop rate 0000 bps"},{t:"ok",s:"      Match: protocol rtp"},{t:"ok",s:"      Priority: 512 kbps, burst bytes 12800"},{t:"ok",s:""},{t:"ok",s:"    Class-map: class-default (match-any)"},{t:"ok",s:"      Fair-queue: 256 queues"}],
      "ping 192.168.1.100": () => [{t:"ok",s:"Type escape sequence to abort."},{t:"ok",s:"Sending 5, 100-byte ICMP Echos to 192.168.1.100, timeout is 2 seconds:"},{t:"ok",s:"!!!!!"},{t:"ok",s:"Success rate is 100 percent (5/5), round-trip min/avg/max = 1/1/4 ms"}],
      "ping 10.10.10.10": () => [{t:"ok",s:"Sending 5, 100-byte ICMP Echos to 10.10.10.10, timeout is 2 seconds:"},{t:"err",s:"....."},{t:"err",s:"Success rate is 0 percent (0/5)"},{t:"warn",s:"⚠️  Aucune réponse — vérifier la route et la connectivité vers 10.10.10.10"}],
      "traceroute 8.8.8.8": () => [{t:"ok",s:"Type escape sequence to abort."},{t:"ok",s:"Tracing the route to dns.google (8.8.8.8)"},{t:"ok",s:"  1 10.0.0.254 4 msec 4 msec 4 msec"},{t:"ok",s:"  2 203.0.113.1 8 msec 8 msec 8 msec"},{t:"ok",s:"  3 * * *"},{t:"ok",s:"  4 8.8.8.8 16 msec 15 msec 16 msec"}],
      "show ip dhcp snooping binding": () => [{t:"ok",s:"MacAddress          IpAddress       Lease(sec)  Type      VLAN  Interface"},{t:"ok",s:"------------------  ---------------  ----------  --------  ----  --------------------"},{t:"ok",s:"00:50:79:66:68:00   192.168.1.100    86400       dhcp-sno  10    GigabitEthernet0/1"},{t:"ok",s:"00:50:79:66:68:01   192.168.1.101    86400       dhcp-sno  10    GigabitEthernet0/2"},{t:"ok",s:"Total number of bindings: 2"}],
      "configure terminal": () => [{t:"warn",s:"Entering configuration commands, one per line.  End with CNTL/Z."},{t:"info",s:"(simulation) Le mode config n'est pas disponible ici — utilisez les commandes 'show' pour l'apprentissage."}],
      "conf t": () => [{t:"warn",s:"Entering configuration commands, one per line.  End with CNTL/Z."},{t:"info",s:"(simulation) Le mode config n'est pas disponible ici — utilisez les commandes 'show' pour l'apprentissage."}],
    }
  },
  powershell: {
    label: "🟦 PowerShell",
    prompt: "PS C:\\Users\\Admin>",
    color: "#93c5fd",
    intro: [
      {t:"ok", s:"Windows PowerShell 7.4"},
      {t:"info", s:"Tape 'help' pour voir les commandes disponibles."}
    ],
    commands: {
      "help": () => [
        {t:"head",s:"=== COMMANDES POWERSHELL DISPONIBLES ==="},
        {t:"ok",s:"Système : Get-Process, Get-Service, Get-Disk, Get-Volume, Get-FileHash"},
        {t:"ok",s:"Réseau : Test-NetConnection, Get-NetTCPConnection, Get-NetFirewallRule, Resolve-DnsName"},
        {t:"ok",s:"Registre : Get-ItemProperty HKLM:\\..., HKCU:\\Run"},
        {t:"ok",s:"AD : Get-ADUser, Get-ADGroupMember, Get-ADComputer, Get-ADDefaultDomainPasswordPolicy"},
        {t:"ok",s:"Sécurité : Get-ExecutionPolicy, Get-WinEvent, auditpol /get /category:*"},
        {t:"ok",s:"Firewall : Get-NetFirewallRule, netsh advfirewall show allprofiles"},
        {t:"ok",s:"BitLocker : manage-bde -status, Get-BitLockerVolume"},
        {t:"ok",s:"Distante : Invoke-Command, Enter-PSSession, Get-PSSession"},
        {t:"info",s:"PowerShell manipule des OBJETS — pas du texte comme bash."}
      ],
      "Get-Process": () => [{t:"ok",s:"NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName"},{t:"ok",s:"------    -----      -----     ------      --  -- -----------"},{t:"ok",s:"    34    42.23     108.45       2.34    1234   1 chrome"},{t:"ok",s:"    12    18.54      52.34       0.12    5678   1 explorer"},{t:"ok",s:"    45    65.12     180.23      12.45    9012   1 svchost"},{t:"ok",s:"     8     4.32      12.10       0.05    3456   0 lsass"},{t:"ok",s:"     5     2.10       8.45       0.02    2345   0 winlogon"}],
      "Get-Process | Sort-Object WorkingSet -Desc | Select-Object -First 5": () => [{t:"ok",s:"NPM(K)    PM(M)      WS(M)     CPU(s)    Id ProcessName"},{t:"ok",s:"    45    65.12     180.23      12.45  9012 svchost"},{t:"ok",s:"    34    42.23     108.45       2.34  1234 chrome"},{t:"ok",s:"    12    18.54      52.34       0.12  5678 explorer"}],
      "Get-Service": () => [{t:"ok",s:"Status   Name               DisplayName"},{t:"ok",s:"------   ----               -----------"},{t:"ok",s:"Running  AdobeARMservice    Adobe Acrobat Update Service"},{t:"ok",s:"Running  bits               Background Intelligent Transfer"},{t:"ok",s:"Stopped  Fax                Fax"},{t:"ok",s:"Running  lsass              Local Security Authority"},{t:"ok",s:"Running  WinDefend          Windows Defender Antivirus"}],
      "Get-Service | Where-Object {$_.Status -eq 'Stopped' -and $_.StartType -eq 'Automatic'}": () => [{t:"warn",s:"Status   Name        DisplayName"},{t:"warn",s:"------   ----        -----------"},{t:"warn",s:"Stopped  wuauserv    Windows Update"},{t:"warn",s:"⚠️  Services Auto mais arrêtés détectés — Windows Update n'est pas actif !"}],
      "Get-ExecutionPolicy -List": () => [{t:"ok",s:"        Scope ExecutionPolicy"},{t:"ok",s:"        ----- ---------------"},{t:"ok",s:"MachinePolicy        Undefined"},{t:"ok",s:"   UserPolicy        Undefined"},{t:"ok",s:"      Process        Undefined"},{t:"ok",s:"  CurrentUser        RemoteSigned"},{t:"ok",s:" LocalMachine        AllSigned"}],
      "Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625} -MaxEvents 10": () => [{t:"warn",s:"TimeCreated            Id    Message"},{t:"warn",s:"-----------            --    -------"},{t:"warn",s:"2024-06-12 08:45:32  4625  An account failed to log on. Account: root"},{t:"warn",s:"2024-06-12 08:45:30  4625  An account failed to log on. Account: Administrator"},{t:"warn",s:"2024-06-12 08:43:11  4625  An account failed to log on. Account: admin"},{t:"info",s:"ℹ️  3 échecs de connexion récents. Vérifiez les sources IP et envisagez un verrouillage."}],
      "Get-WinEvent -FilterHashtable @{LogName='Security';Id=4624} -MaxEvents 5": () => [{t:"ok",s:"TimeCreated            Id    Message"},{t:"ok",s:"-----------            --    -------"},{t:"ok",s:"2024-06-12 09:00:01  4624  An account was successfully logged on. Admin"},{t:"ok",s:"2024-06-12 08:40:00  4624  An account was successfully logged on. Alice"}],
      "Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688} -MaxEvents 5": () => [{t:"ok",s:"TimeCreated            Id    Process               CommandLine"},{t:"ok",s:"-----------            --    -------               -----------"},{t:"ok",s:"2024-06-12 09:01:22  4688  cmd.exe               cmd /c whoami"},{t:"warn",s:"2024-06-12 09:00:55  4688  powershell.exe        -enc JAB...==  (base64 !)"},{t:"warn",s:"⚠️  PowerShell encodé en base64 détecté — souvent signe d'activité malveillante !"}],
      "Get-NetTCPConnection -State Listen | Sort-Object LocalPort": () => [{t:"ok",s:"LocalAddress  LocalPort RemoteAddress RemotePort State   OwningProcess"},{t:"ok",s:"0.0.0.0       80        0.0.0.0       0          Listen  4"},{t:"ok",s:"0.0.0.0       135       0.0.0.0       0          Listen  996  (RPC)"},{t:"ok",s:"0.0.0.0       443       0.0.0.0       0          Listen  4"},{t:"ok",s:"0.0.0.0       445       0.0.0.0       0          Listen  4   (SMB !)"},{t:"ok",s:"0.0.0.0       3389      0.0.0.0       0          Listen  1124 (RDP !)"},{t:"warn",s:"⚠️  RDP (3389) et SMB (445) exposés — vérifier si c'est intentionnel"}],
      "Test-NetConnection -ComputerName 8.8.8.8 -Port 53": () => [{t:"ok",s:"ComputerName     : 8.8.8.8"},{t:"ok",s:"RemoteAddress    : 8.8.8.8"},{t:"ok",s:"RemotePort       : 53"},{t:"ok",s:"InterfaceAlias   : Ethernet0"},{t:"ok",s:"SourceAddress    : 192.168.1.100"},{t:"ok",s:"TcpTestSucceeded : True"}],
      "Test-NetConnection -ComputerName 10.0.0.5 -Port 3389": () => [{t:"warn",s:"ComputerName     : 10.0.0.5"},{t:"warn",s:"RemoteAddress    : 10.0.0.5"},{t:"warn",s:"RemotePort       : 3389"},{t:"warn",s:"TcpTestSucceeded : False"},{t:"warn",s:"ℹ️  Port 3389 inaccessible sur 10.0.0.5 — vérifier pare-feu ou que RDP est actif"}],
      "Resolve-DnsName google.fr -Type MX": () => [{t:"ok",s:"Name           Type   TTL    Section    NameExchange   Preference"},{t:"ok",s:"----           ----   ---    -------    ------------   ----------"},{t:"ok",s:"google.fr      MX     300    Answer     smtp.google.com  10"}],
      "Get-NetFirewallRule -Enabled True -Direction Inbound | Select-Object DisplayName,Action | Select-Object -First 10": () => [{t:"ok",s:"DisplayName                                        Action"},{t:"ok",s:"-----------                                        ------"},{t:"ok",s:"World Wide Web Services (HTTP Traffic-In)          Allow"},{t:"ok",s:"World Wide Web Services (HTTPS Traffic-In)         Allow"},{t:"ok",s:"Windows Remote Management (HTTP-In)               Allow"},{t:"ok",s:"Remote Desktop - User Mode (TCP-In)               Allow"},{t:"warn",s:"File and Printer Sharing (Echo Request-ICMPv4-In)  Allow"}],
      "netsh advfirewall show allprofiles": () => [{t:"ok",s:"Domain Profile Settings:"},{t:"ok",s:"State                               ON"},{t:"ok",s:"Firewall Policy                     BlockInbound,AllowOutbound"},{t:"ok",s:""},{t:"ok",s:"Private Profile Settings:"},{t:"ok",s:"State                               ON"},{t:"ok",s:""},{t:"ok",s:"Public Profile Settings:"},{t:"ok",s:"State                               ON"},{t:"ok",s:"Firewall Policy                     BlockInbound,AllowOutbound"},{t:"ok",s:"Ok."}],
      "Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'": () => [{t:"ok",s:"OneDrive    : C:\\Users\\Admin\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe"},{t:"ok",s:"Teams       : C:\\Users\\Admin\\AppData\\Local\\Microsoft\\Teams\\Update.exe --processStart"},{t:"warn",s:"svchost32   : C:\\Temp\\svchost32.exe"},{t:"warn",s:"⚠️  svchost32.exe dans C:\\Temp est suspect ! Analysez ce binaire."}],
      "Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'": () => [{t:"ok",s:"SecurityHealth  : C:\\Windows\\System32\\SecurityHealthSystray.exe"},{t:"ok",s:"WindowsDefender : C:\\Program Files\\Windows Defender\\MSASCuiL.exe"}],
      "manage-bde -status": () => [{t:"ok",s:"Disk volumes that can be protected with"},{t:"ok",s:"BitLocker Drive Encryption:"},{t:"ok",s:"Volume C: [System]"},{t:"ok",s:" [OS Volume]"},{t:"ok",s:" Size:                 238.47 GB"},{t:"ok",s:" BitLocker Version:    2.0"},{t:"ok",s:" Conversion Status:    Fully Encrypted"},{t:"ok",s:" Percentage Encrypted: 100.0%"},{t:"ok",s:" Encryption Method:    XTS-AES 256"},{t:"ok",s:" Protection Status:    Protection On"}],
      "Get-FileHash C:\\Windows\\System32\\cmd.exe -Algorithm SHA256": () => [{t:"ok",s:"Algorithm  Hash                                                              Path"},{t:"ok",s:"---------  ----                                                              ----"},{t:"ok",s:"SHA256     D06E9F9BEE8E77F59C0B7C6A2B24A0B5F7E8A3C1D2E4F5A6B7C8D9E0F1A2B3C4  C:\\Windows\\System32\\cmd.exe"}],
      "auditpol /get /category:*": () => [{t:"ok",s:"System audit policy"},{t:"ok",s:""},{t:"ok",s:"Category/Subcategory                      Setting"},{t:"ok",s:"System"},{t:"ok",s:"  Security System Extension                No Auditing"},{t:"ok",s:"  System Integrity                         Success and Failure"},{t:"ok",s:"Logon/Logoff"},{t:"ok",s:"  Logon                                   Success and Failure"},{t:"ok",s:"  Logoff                                  Success"},{t:"ok",s:"Object Access"},{t:"ok",s:"  File System                              No Auditing"},{t:"warn",s:"ℹ️  'File System' non audité — activer pour détecter accès aux fichiers sensibles"}],
      "Get-ADUser -Filter {Enabled -eq $false}": () => [{t:"ok",s:"DistinguishedName : CN=old_service,OU=Services,DC=lab,DC=local"},{t:"ok",s:"Enabled           : False"},{t:"ok",s:"GivenName         : service"},{t:"ok",s:"SamAccountName    : old_service"},{t:"ok",s:""},{t:"ok",s:"DistinguishedName : CN=John Smith,OU=Users,DC=lab,DC=local"},{t:"ok",s:"Enabled           : False"},{t:"ok",s:"SamAccountName    : jsmith"}],
      "Get-ADGroupMember 'Domain Admins' -Recursive": () => [{t:"ok",s:"SamAccountName  ObjectClass DistinguishedName"},{t:"ok",s:"--------------  ----------- -----------------"},{t:"ok",s:"Administrator   user        CN=Administrator,CN=Users,DC=lab,DC=local"},{t:"ok",s:"alice           user        CN=Alice Martin,OU=IT,DC=lab,DC=local"},{t:"warn",s:"svc_backup      user        CN=svc_backup,OU=Services,DC=lab,DC=local"},{t:"warn",s:"⚠️  svc_backup dans Domain Admins ! Un compte de service ne devrait jamais être DA."}],
      "Get-ADDefaultDomainPasswordPolicy": () => [{t:"ok",s:"ComplexityEnabled           : True"},{t:"ok",s:"DistinguishedName           : DC=lab,DC=local"},{t:"ok",s:"LockoutDuration             : 00:30:00"},{t:"ok",s:"LockoutObservationWindow    : 00:30:00"},{t:"ok",s:"LockoutThreshold            : 5"},{t:"ok",s:"MaxPasswordAge              : 90.00:00:00"},{t:"ok",s:"MinPasswordAge              : 1.00:00:00"},{t:"ok",s:"MinPasswordLength           : 12"},{t:"ok",s:"PasswordHistoryCount        : 24"}],
      "gpresult /r": () => [{t:"ok",s:"Microsoft (R) Windows (R) Operating System Group Policy Result tool"},{t:"ok",s:""},{t:"ok",s:"RSOP data for LAB\\Admin on WORKSTATION01"},{t:"ok",s:""},{t:"ok",s:"OS Configuration:            Member Workstation"},{t:"ok",s:"OS Version:                  10.0.22621"},{t:"ok",s:"Site Name:                   Default-First-Site-Name"},{t:"ok",s:""},{t:"ok",s:"Applied Group Policy Objects"},{t:"ok",s:"  Default Domain Policy"},{t:"ok",s:"  Security Baseline - Workstations"},{t:"ok",s:"  BitLocker Policy"}],
      "gpupdate /force": () => [{t:"ok",s:"Updating Policy..."},{t:"ok",s:""},{t:"ok",s:"Computer Policy update has completed successfully."},{t:"ok",s:"User Policy update has completed successfully."}],
      "Invoke-Command -ComputerName SRV01 -ScriptBlock { hostname }": () => [{t:"ok",s:"SRV01"}],
      "Get-PSSession": () => [{t:"ok",s:"Id Name       ComputerName State       ConfigurationName Availability"},{t:"ok",s:"-- ----       ------------ -----       ----------------- ------------"},{t:"ok",s:" 1 Session1   SRV01        Opened      Microsoft.PowerShell Available"}],
      "Get-CimInstance -ClassName Win32_OperatingSystem": () => [{t:"ok",s:"SystemDirectory   : C:\\Windows\\system32"},{t:"ok",s:"Organization      :"},{t:"ok",s:"BuildNumber       : 22621"},{t:"ok",s:"RegisteredUser    : Admin"},{t:"ok",s:"SerialNumber      : 00330-50000-00000-AAOEM"},{t:"ok",s:"Version           : 10.0.22621"}],
      "Get-CimInstance -ClassName Win32_LogicalDisk": () => [{t:"ok",s:"DeviceID DriveType ProviderName VolumeName    Size           FreeSpace"},{t:"ok",s:"-------- --------- ------------ ----------    ----           ---------"},{t:"ok",s:"C:       3                      Windows       256098066432   158034067456"},{t:"ok",s:"D:       3                      Data          1099511627776  850000000000"}],
      "whoami": () => [{t:"ok",s:"lab\\admin"}],
      "whoami /groups": () => [{t:"ok",s:"GROUP INFORMATION"},{t:"ok",s:"Group Name                           Attributes"},{t:"ok",s:"==================================== ============"},{t:"ok",s:"LAB\\Domain Admins                    Mandatory group, Enabled"},{t:"ok",s:"NT AUTHORITY\\Authenticated Users     Mandatory group, Enabled"},{t:"ok",s:"BUILTIN\\Administrators               Mandatory group, Enabled by default"}],
      "net localgroup administrators": () => [{t:"ok",s:"Alias name     administrators"},{t:"ok",s:"Members"},{t:"ok",s:""},{t:"ok",s:"Administrator"},{t:"ok",s:"alice"},{t:"warn",s:"hacker_tool"},{t:"warn",s:"⚠️  'hacker_tool' dans le groupe Administrators est suspect !"}],
    }
  }
  ,
  docker: {
    label: "🐳 Docker/K8s",
    prompt: "$ ",
    color: "#38bdf8",
    intro: [
      {t:"ok", s:"Environnement Docker & Kubernetes simulé"},
      {t:"info", s:"Tape 'help' pour voir les commandes disponibles."}
    ],
    commands: {
      "help": () => [
        {t:"head",s:"=== COMMANDES DOCKER / KUBERNETES / ANSIBLE ==="},
        {t:"ok",s:"Docker : docker ps, docker ps -a, docker images, docker logs, docker inspect, docker stats"},
        {t:"ok",s:"Docker : docker exec, docker top, docker network ls, docker volume ls, docker-compose up/down"},
        {t:"ok",s:"Kubernetes : kubectl get pods/nodes/svc/deploy/namespaces, kubectl describe pod, kubectl logs"},
        {t:"ok",s:"Kubernetes : kubectl exec, kubectl scale, kubectl rollout, kubectl apply, kubectl get events"},
        {t:"ok",s:"Ansible : ansible all -m ping, ansible-playbook --check/--diff, ansible-vault encrypt"},
        {t:"info",s:"Tape 'clear' pour vider l'écran."}
      ],
      "docker ps": () => [
        {t:"ok",s:"CONTAINER ID   IMAGE        COMMAND      CREATED      STATUS       PORTS                NAMES"},
        {t:"ok",s:"a1b2c3d4e5f6   nginx:1.25   \"/docker-…\" 2 hours ago  Up 2 hours   0.0.0.0:80->80/tcp   web-prod"},
        {t:"ok",s:"b2c3d4e5f6a1   postgres:15  \"docker-…\"  2 hours ago  Up 2 hours   5432/tcp             db-prod"},
        {t:"ok",s:"c3d4e5f6a1b2   redis:7      \"docker-…\"  1 hour ago   Up 1 hour    6379/tcp             cache"}
      ],
      "docker ps -a": () => [
        {t:"ok",s:"CONTAINER ID   IMAGE        STATUS                    NAMES"},
        {t:"ok",s:"a1b2c3d4e5f6   nginx:1.25   Up 2 hours                web-prod"},
        {t:"ok",s:"b2c3d4e5f6a1   postgres:15  Up 2 hours                db-prod"},
        {t:"warn",s:"d4e5f6a1b2c3   myapp:1.0    Exited (1) 3 hours ago    app-crashed"},
        {t:"warn",s:"ℹ️  myapp crashé (exit 1) — utilise 'docker logs app-crashed' pour diagnostiquer."}
      ],
      "docker images": () => [
        {t:"ok",s:"REPOSITORY   TAG       IMAGE ID       CREATED        SIZE"},
        {t:"ok",s:"nginx        1.25      a6bd71f48f68   2 weeks ago    187MB"},
        {t:"ok",s:"postgres     15        75d8b1f22c3a   3 weeks ago    412MB"},
        {t:"ok",s:"redis        7         7614ae9453d1   1 month ago    130MB"},
        {t:"warn",s:"<none>       <none>    d5e6f7a8b9c0   2 weeks ago    298MB"},
        {t:"warn",s:"ℹ️  Image dangling (<none>) = couche orpheline. Nettoie: docker image prune"}
      ],
      "docker logs web-prod": () => [
        {t:"ok",s:"2024/06/12 07:00:01 [notice] nginx/1.25.3"},
        {t:"ok",s:"192.168.1.10 - [12/Jun/2024:09:01:22] \"GET /api/health\" 200"},
        {t:"warn",s:"192.168.1.10 - [12/Jun/2024:09:03:01] \"GET /admin\" 403"}
      ],
      "docker logs app-crashed": () => [
        {t:"ok",s:"Starting myapp v1.0..."},
        {t:"ok",s:"Connecting to database at db-prod:5432..."},
        {t:"err",s:"ConnectionRefusedError: [Errno 111] Connection refused"},
        {t:"err",s:"ERROR: Could not connect to PostgreSQL after 3 retries."},
        {t:"warn",s:"⚠️  L'app ne peut pas joindre db-prod:5432. Vérifier: réseau Docker, nom du service, healthcheck."}
      ],
      "docker exec web-prod nginx -t": () => [
        {t:"ok",s:"nginx: the configuration file /etc/nginx/nginx.conf syntax is ok"},
        {t:"ok",s:"nginx: configuration file /etc/nginx/nginx.conf test is successful"}
      ],
      "docker inspect web-prod": () => [
        {t:"ok",s:"  \"State\": { \"Status\": \"running\", \"Pid\": 1234 },"},
        {t:"ok",s:"  \"NetworkSettings\": { \"IPAddress\": \"172.17.0.2\", \"Ports\": { \"80/tcp\": [{\"HostPort\": \"80\"}] } },"},
        {t:"ok",s:"  \"Mounts\": [{ \"Type\": \"bind\", \"Source\": \"/data/nginx\", \"Destination\": \"/etc/nginx/conf.d\" }]"}
      ],
      "docker stats": () => [
        {t:"ok",s:"CONTAINER   CPU %   MEM USAGE / LIMIT   MEM %   NET I/O"},
        {t:"ok",s:"web-prod    0.2%    12.5MiB / 512MiB    2.4%    1.2MB / 800KB"},
        {t:"ok",s:"db-prod     1.8%    156MiB / 1GiB       15.2%   200KB / 180KB"},
        {t:"info",s:"ℹ️  Sans --memory sur docker run, le conteneur peut consommer toute la RAM hôte."}
      ],
      "docker top web-prod": () => [
        {t:"ok",s:"UID    PID    CMD"},
        {t:"ok",s:"root   1234   nginx: master process nginx"},
        {t:"ok",s:"101    1235   nginx: worker process"}
      ],
      "docker network ls": () => [
        {t:"ok",s:"NETWORK ID     NAME          DRIVER    SCOPE"},
        {t:"ok",s:"a1b2c3d4e5f6   bridge        bridge    local"},
        {t:"ok",s:"d4e5f6a1b2c3   app-network   bridge    local"},
        {t:"info",s:"ℹ️  Conteneurs sur le même réseau bridge custom se joignent par leur nom (DNS interne Docker)."}
      ],
      "docker volume ls": () => [
        {t:"ok",s:"DRIVER    VOLUME NAME"},
        {t:"ok",s:"local     db-data"},
        {t:"warn",s:"local     a1b2c3d4e5f6deadbeef"},
        {t:"warn",s:"ℹ️  Volume anonyme — préférer les volumes nommés. Nettoyage: docker volume prune"}
      ],
      "docker-compose up -d": () => [
        {t:"ok",s:"[+] Running 4/4"},
        {t:"ok",s:" ✔ Network app-network  Created"},
        {t:"ok",s:" ✔ Container db-prod    Started"},
        {t:"ok",s:" ✔ Container web-prod   Started"},
        {t:"info",s:"ℹ️  -d = detached. Logs: docker-compose logs -f. Arrêt: docker-compose down"}
      ],
      "docker-compose down": () => [
        {t:"ok",s:"[+] Running 3/3"},
        {t:"ok",s:" ✔ Container web-prod  Stopped"},
        {t:"ok",s:" ✔ Container db-prod   Stopped"},
        {t:"ok",s:" ✔ Network app-network Removed"},
        {t:"warn",s:"ℹ️  Volumes conservés. Ajoute -v pour les supprimer aussi."}
      ],
      "docker build -t myapp:2.0 .": () => [
        {t:"ok",s:"[+] Building 12.3s (4/4) FINISHED"},
        {t:"ok",s:" => FROM python:3.11-slim                          3.2s"},
        {t:"ok",s:" => COPY requirements.txt && pip install           7.8s"},
        {t:"ok",s:" => COPY . .                                       0.2s"},
        {t:"ok",s:"Successfully tagged myapp:2.0"},
        {t:"info",s:"✅ Utiliser .dockerignore pour exclure node_modules/.git. Tagger avec version ET latest."}
      ],
      "kubectl get pods": () => [
        {t:"ok",s:"NAME                          READY   STATUS             RESTARTS   AGE"},
        {t:"ok",s:"web-deploy-7d4b9f8c6-x2k9p    1/1     Running            0          2h"},
        {t:"ok",s:"web-deploy-7d4b9f8c6-m3n8q    1/1     Running            0          2h"},
        {t:"warn",s:"db-deploy-5c8f7d9b4-p1r2s     0/1     CrashLoopBackOff   5          45m"},
        {t:"warn",s:"⚠️  db-deploy en CrashLoopBackOff — 'kubectl logs db-deploy-5c8f7d9b4-p1r2s' pour diagnostiquer."}
      ],
      "kubectl get pods -A": () => [
        {t:"ok",s:"NAMESPACE     NAME                       READY   STATUS             RESTARTS"},
        {t:"ok",s:"default       web-deploy-7d4b9-x2k9p     1/1     Running            0"},
        {t:"warn",s:"default       db-deploy-5c8f7-p1r2s      0/1     CrashLoopBackOff   5"},
        {t:"ok",s:"kube-system   coredns-5dd57-x2k9p        1/1     Running            0"}
      ],
      "kubectl get nodes": () => [
        {t:"ok",s:"NAME         STATUS     ROLES           AGE   VERSION"},
        {t:"ok",s:"master-01    Ready      control-plane   5d    v1.29.0"},
        {t:"ok",s:"worker-01    Ready      <none>          5d    v1.29.0"},
        {t:"warn",s:"worker-02    NotReady   <none>          5d    v1.29.0"},
        {t:"warn",s:"⚠️  worker-02 NotReady — vérifier kubelet: journalctl -u kubelet -n 50 sur le nœud."}
      ],
      "kubectl get svc": () => [
        {t:"ok",s:"NAME       TYPE           CLUSTER-IP    EXTERNAL-IP    PORT(S)       AGE"},
        {t:"ok",s:"web-svc    LoadBalancer   10.104.12.34  203.0.113.10   80:31234/TCP  2h"},
        {t:"ok",s:"db-svc     ClusterIP      10.104.56.78  <none>         5432/TCP      2h"}
      ],
      "kubectl get namespaces": () => [
        {t:"ok",s:"NAME          STATUS   AGE"},
        {t:"ok",s:"default       Active   5d"},
        {t:"ok",s:"kube-system   Active   5d"},
        {t:"ok",s:"monitoring    Active   3d"},
        {t:"ok",s:"production    Active   2d"}
      ],
      "kubectl describe pod db-deploy-5c8f7d9b4-p1r2s": () => [
        {t:"ok",s:"Status:       Running (CrashLoopBackOff)"},
        {t:"warn",s:"Last State:   Terminated — Reason: Error — Exit Code: 1 — Restart Count: 5"},
        {t:"warn",s:"Events:"},
        {t:"warn",s:"  Warning BackOff  2m  kubelet  Back-off restarting failed container db"},
        {t:"warn",s:"⚠️  Exit code 1 + BackOff = crash au démarrage. Voir logs pour la cause exacte."}
      ],
      "kubectl logs db-deploy-5c8f7d9b4-p1r2s": () => [
        {t:"err",s:"FATAL: data directory \"/var/lib/postgresql/data\" has wrong ownership"},
        {t:"err",s:"HINT: The server must be started by the user that owns the data directory."},
        {t:"warn",s:"⚠️  Problème de permissions PVC. Solution: fsGroup: 999 dans securityContext du pod."}
      ],
      "kubectl get deploy": () => [
        {t:"ok",s:"NAME         READY   UP-TO-DATE   AVAILABLE   AGE"},
        {t:"ok",s:"web-deploy   2/2     2            2           2h"},
        {t:"warn",s:"db-deploy    0/1     1            0           45m"}
      ],
      "kubectl scale deploy web-deploy --replicas=4": () => [
        {t:"ok",s:"deployment.apps/web-deploy scaled"},
        {t:"ok",s:"web-deploy-7d4b9f8c6-a4b5c   1/1   Running   0   10s"},
        {t:"ok",s:"web-deploy-7d4b9f8c6-d6e7f   1/1   Running   0   10s"},
        {t:"info",s:"✅ 4 réplicas actifs. HPA peut automatiser le scaling selon CPU/mémoire."}
      ],
      "kubectl rollout status deploy web-deploy": () => [
        {t:"ok",s:"Waiting for deployment rollout: 1 out of 2 new replicas updated..."},
        {t:"ok",s:"deployment \"web-deploy\" successfully rolled out"}
      ],
      "kubectl rollout undo deploy web-deploy": () => [
        {t:"warn",s:"deployment.apps/web-deploy rolled back"},
        {t:"ok",s:"deployment \"web-deploy\" successfully rolled out"},
        {t:"info",s:"ℹ️  kubectl rollout history deploy web-deploy pour voir les révisions disponibles."}
      ],
      "kubectl apply -f deployment.yaml": () => [
        {t:"ok",s:"deployment.apps/web-deploy configured"},
        {t:"ok",s:"service/web-svc unchanged"},
        {t:"info",s:"✅ Toujours kubectl apply (déclaratif) plutôt que kubectl create (impératif)."}
      ],
      "kubectl get events --sort-by=.lastTimestamp": () => [
        {t:"ok",s:"LAST SEEN   TYPE      REASON            OBJECT              MESSAGE"},
        {t:"ok",s:"4m          Normal    Started           pod/web-x2k9p       Started container"},
        {t:"warn",s:"2m          Warning   BackOff           pod/db-p1r2s        Back-off restarting failed container"},
        {t:"warn",s:"1m          Warning   FailedScheduling  pod/app-z9y8x       0/2 nodes: insufficient memory"}
      ],
      "ansible all -m ping": () => [
        {t:"ok",s:"webserver01 | SUCCESS => { \"ping\": \"pong\" }"},
        {t:"ok",s:"webserver02 | SUCCESS => { \"ping\": \"pong\" }"},
        {t:"warn",s:"dbserver01 | UNREACHABLE! => { \"msg\": \"Failed to connect via ssh: Connection timed out\" }"},
        {t:"warn",s:"⚠️  dbserver01 injoignable — vérifier SSH, clé, et pare-feu port 22."}
      ],
      "ansible-playbook deploy.yml --check": () => [
        {t:"ok",s:"PLAY [Deploy web application] **************"},
        {t:"ok",s:"TASK [Install nginx]  ok: [webserver01] (already installed)"},
        {t:"warn",s:"TASK [Install nginx]  changed: [webserver02] (would install nginx 1.25)"},
        {t:"warn",s:"TASK [Copy nginx config]  changed: [webserver01] (config differs)"},
        {t:"ok",s:"PLAY RECAP  webserver01: ok=2 changed=1   webserver02: ok=1 changed=1"},
        {t:"info",s:"ℹ️  --check = dry-run, rien n'est modifié. Retire --check pour appliquer."}
      ],
      "ansible-playbook deploy.yml": () => [
        {t:"ok",s:"TASK [Install nginx]     changed: [webserver02]"},
        {t:"ok",s:"TASK [Copy nginx config] changed: [webserver01]"},
        {t:"ok",s:"TASK [Restart nginx]     changed: [webserver01]"},
        {t:"ok",s:"PLAY RECAP  webserver01: ok=3 changed=2   webserver02: ok=2 changed=1"},
        {t:"info",s:"✅ Ansible est idempotent: relancer le playbook ne rechange que ce qui diffère."}
      ],
      "ansible-playbook deploy.yml --diff": () => [
        {t:"ok",s:"TASK [Copy nginx config]"},
        {t:"ok",s:"--- before: /etc/nginx/nginx.conf"},
        {t:"ok",s:"+++ after:  /etc/nginx/nginx.conf"},
        {t:"ok",s:"-worker_processes 1;"},
        {t:"ok",s:"+worker_processes auto;"},
        {t:"info",s:"ℹ️  --diff montre exactement ce qui change dans les fichiers. Combinable avec --check."}
      ],
      "ansible-vault encrypt secrets.yml": () => [
        {t:"ok",s:"New Vault password: ****"},
        {t:"ok",s:"Encryption successful"},
        {t:"info",s:"ℹ️  secrets.yml chiffré en AES-256. Utilise --ask-vault-pass ou --vault-password-file à l'exécution."}
      ]
    }
  },
  proxmox: {
    label: "🟧 Proxmox VE",
    prompt: "root@proxmox:~#",
    color: "#fb923c",
    intro: [
      {t:"ok", s:"Proxmox VE 8.1 — Hyperviseur Type 1 (KVM + LXC)"},
      {t:"info", s:"Tape 'help' pour voir les commandes disponibles."}
    ],
    commands: {
      "help": () => [
        {t:"head",s:"=== COMMANDES PROXMOX VE ==="},
        {t:"ok",s:"VMs (qm) : qm list, qm status, qm start/stop/shutdown, qm reset, qm config"},
        {t:"ok",s:"VMs (qm) : qm migrate, qm snapshot, qm rollback, qm clone, qm set"},
        {t:"ok",s:"Conteneurs (pct) : pct list, pct status, pct start/stop, pct enter, pct config"},
        {t:"ok",s:"Cluster : pvecm status, pvecm nodes, pvecm add"},
        {t:"ok",s:"Stockage : pvesm status, pvesm list, vzdump (sauvegarde)"},
        {t:"ok",s:"Réseau : cat /etc/network/interfaces, brctl show"},
        {t:"ok",s:"Système : pveversion, pvesh get /nodes, journalctl -u pvedaemon"},
        {t:"info",s:"Tape 'clear' pour vider l'écran."}
      ],
      "qm list": () => [
        {t:"ok",s:"      VMID NAME                 STATUS     MEM(MB)    BOOTDISK(GB) PID"},
        {t:"ok",s:"       100 debian-template      stopped    2048              20.00   0"},
        {t:"ok",s:"       101 web-prod             running    4096              40.00 1234"},
        {t:"ok",s:"       102 db-prod              running    8192              80.00 1235"},
        {t:"warn",s:"       103 test-vm             stopped    1024              10.00   0"},
        {t:"ok",s:"       200 pfsense-fw           running    2048              16.00 1236"}
      ],
      "qm status 101": () => [
        {t:"ok",s:"status: running"},
        {t:"ok",s:"ha: managed"},
        {t:"ok",s:"uptime: 5days, 3hours"},
        {t:"ok",s:"qmpstatus: running"},
        {t:"ok",s:"cpu: 0.02"},
        {t:"ok",s:"mem: 3850149888"},
        {t:"ok",s:"maxmem: 4294967296"},
        {t:"ok",s:"disk: 0"},
        {t:"ok",s:"maxdisk: 42949672960"}
      ],
      "qm config 101": () => [
        {t:"ok",s:"boot: order=scsi0;ide2;net0"},
        {t:"ok",s:"cores: 2"},
        {t:"ok",s:"cpu: host"},
        {t:"ok",s:"ide2: none,media=cdrom"},
        {t:"ok",s:"memory: 4096"},
        {t:"ok",s:"name: web-prod"},
        {t:"ok",s:"net0: virtio=BC:24:11:AA:BB:CC,bridge=vmbr0,firewall=1"},
        {t:"ok",s:"numa: 0"},
        {t:"ok",s:"ostype: l26"},
        {t:"ok",s:"scsi0: local-lvm:vm-101-disk-0,size=40G,ssd=1"},
        {t:"ok",s:"scsihw: virtio-scsi-pci"},
        {t:"ok",s:"sockets: 1"},
        {t:"ok",s:"vmgenid: 4a3c2b1d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"}
      ],
      "qm start 103": () => [
        {t:"ok",s:"starting VM 103"},
        {t:"ok",s:"kvm: bound to NUMA node 0"},
        {t:"ok",s:"VM 103 started successfully"}
      ],
      "qm shutdown 103": () => [
        {t:"ok",s:"sending ACPI shutdown to VM 103"},
        {t:"ok",s:"(attente arrêt propre via ACPI...)"},
        {t:"ok",s:"VM 103 stopped"}
      ],
      "qm stop 103": () => [
        {t:"warn",s:"stopping VM 103 (hard stop — perte données possibles si non sauvegardé)"},
        {t:"warn",s:"⚠️  Utilise 'qm shutdown' pour un arrêt propre via ACPI. 'qm stop' = coupure brutale."}
      ],
      "qm reset 101": () => [
        {t:"warn",s:"resetting VM 101"},
        {t:"warn",s:"⚠️  Reset = redémarrage forcé sans ACPI. Risque de corruption FS. Préférer 'qm reboot 101'."}
      ],
      "qm snapshot 101 snap-avant-maj": () => [
        {t:"ok",s:"creating snapshot 'snap-avant-maj' for VM 101"},
        {t:"ok",s:"freezing filesystem on /dev/sda1"},
        {t:"ok",s:"snapshot created successfully"},
        {t:"info",s:"✅ Snapshot pris. Rollback: 'qm rollback 101 snap-avant-maj'. Snapshots = état RAM + disque."}
      ],
      "qm rollback 101 snap-avant-maj": () => [
        {t:"warn",s:"rolling back VM 101 to snapshot 'snap-avant-maj'"},
        {t:"warn",s:"⚠️  La VM doit être éteinte pour un rollback. Arrêt en cours..."},
        {t:"ok",s:"VM 101 stopped"},
        {t:"ok",s:"rollback to 'snap-avant-maj' complete"},
        {t:"ok",s:"VM 101 started"},
        {t:"info",s:"ℹ️  Tout ce qui s'est passé depuis le snapshot est perdu (données, configs, logs)."}
      ],
      "qm clone 100 105 --name web-clone --full": () => [
        {t:"ok",s:"create full clone of VM 100 (debian-template) as VM 105 (web-clone)"},
        {t:"ok",s:"copying disk local-lvm:vm-100-disk-0..."},
        {t:"ok",s:"clone completed: VM 105 created"},
        {t:"info",s:"ℹ️  --full = clone complet indépendant. Sans --full = clone lié (linked, dépend du template = plus rapide mais moins flexible)."}
      ],
      "qm migrate 101 pve-node2 --online": () => [
        {t:"ok",s:"Migrating VM 101 to node 'pve-node2' (online/live migration)"},
        {t:"ok",s:"precondition check OK"},
        {t:"ok",s:"starting migration of VM 101 to node 'pve-node2'"},
        {t:"ok",s:"transferred 4096 MB in 12.3 seconds (333 MB/s)"},
        {t:"ok",s:"migration finished successfully (duration 00:00:14)"},
        {t:"info",s:"✅ Migration à chaud (zero downtime). Nécessite stockage partagé (NFS/Ceph) entre les nœuds."}
      ],
      "qm set 101 --memory 8192": () => [
        {t:"ok",s:"update VM 101: -memory 8192"},
        {t:"info",s:"ℹ️  Modifie la config de la VM. Prend effet au prochain démarrage (ou à chaud si balloon driver actif)."}
      ],
      "pct list": () => [
        {t:"ok",s:"VMID       Status  Name             Mem(MB)"},
        {t:"ok",s:"300        running nginx-ct         512"},
        {t:"ok",s:"301        running dns-ct           256"},
        {t:"warn",s:"302        stopped test-ct         128"},
        {t:"info",s:"ℹ️  LXC = conteneurs Linux (partage le noyau Proxmox). Plus léger qu'une VM KVM."}
      ],
      "pct status 300": () => [
        {t:"ok",s:"status: running"},
        {t:"ok",s:"ha: unmanaged"},
        {t:"ok",s:"uptime: 2days"},
        {t:"ok",s:"cpu: 0.01"},
        {t:"ok",s:"mem: 48234496"},
        {t:"ok",s:"maxmem: 536870912"}
      ],
      "pct start 302": () => [
        {t:"ok",s:"starting CT 302"},
        {t:"ok",s:"CT 302 started"}
      ],
      "pct stop 300": () => [
        {t:"ok",s:"stopping CT 300"},
        {t:"ok",s:"CT 300 stopped"}
      ],
      "pct enter 300": () => [
        {t:"ok",s:"Entering container 300 (nginx-ct)..."},
        {t:"ok",s:"root@nginx-ct:/#"},
        {t:"info",s:"(simulation) Shell dans le conteneur LXC. 'exit' pour quitter."},
        {t:"info",s:"ℹ️  pct enter = accès direct au shell du conteneur sans SSH. Très pratique pour le debug."}
      ],
      "pct config 300": () => [
        {t:"ok",s:"arch: amd64"},
        {t:"ok",s:"cores: 1"},
        {t:"ok",s:"hostname: nginx-ct"},
        {t:"ok",s:"memory: 512"},
        {t:"ok",s:"net0: name=eth0,bridge=vmbr0,hwaddr=BC:24:11:CC:DD:EE,ip=192.168.1.50/24,gw=192.168.1.1"},
        {t:"ok",s:"ostype: debian"},
        {t:"ok",s:"rootfs: local-lvm:vm-300-disk-0,size=8G"},
        {t:"ok",s:"swap: 512"},
        {t:"ok",s:"unprivileged: 1"}
      ],
      "pvecm status": () => [
        {t:"ok",s:"Cluster information"},
        {t:"ok",s:"------------------"},
        {t:"ok",s:"Name:             pve-cluster"},
        {t:"ok",s:"Config Version:   3"},
        {t:"ok",s:"Transport:        knet"},
        {t:"ok",s:"Secure auth:      on"},
        {t:"ok",s:""},
        {t:"ok",s:"Quorum information"},
        {t:"ok",s:"------------------"},
        {t:"ok",s:"Date:             Mon Jun 12 09:15:42 2024"},
        {t:"ok",s:"Quorum provider:  corosync_votequorum"},
        {t:"ok",s:"Nodes:            3"},
        {t:"ok",s:"Node votes:       3"},
        {t:"ok",s:"Expected votes:   3"},
        {t:"ok",s:"Total votes:      3"},
        {t:"ok",s:"Quorum:           2"},
        {t:"ok",s:"Flags:            Quorate"},
        {t:"warn",s:"ℹ️  Quorum = majorité de nœuds (2/3 ici). Si un nœud tombe, le cluster reste fonctionnel."}
      ],
      "pvecm nodes": () => [
        {t:"ok",s:"Membership information"},
        {t:"ok",s:"Node  Sts  Inc  Joined                Name"},
        {t:"ok",s:"   1   M    4   2024-06-07 08:00:00   pve-node1 (local)"},
        {t:"ok",s:"   2   M    4   2024-06-07 08:01:00   pve-node2"},
        {t:"ok",s:"   3   M    4   2024-06-07 08:02:00   pve-node3"},
        {t:"info",s:"ℹ️  M = Member (actif). 3 nœuds = minimum recommandé pour HA avec quorum."}
      ],
      "pvesm status": () => [
        {t:"ok",s:"Name             Type     Status     Total(GB) Used(GB) Available(GB) %"},
        {t:"ok",s:"local            dir      active          100     35.2        64.8    35%"},
        {t:"ok",s:"local-lvm        lvmthin  active         1000    420.0       580.0    42%"},
        {t:"ok",s:"ceph-pool        rbd      active         3000   1200.0      1800.0    40%"},
        {t:"warn",s:"nfs-backup       nfs      active         2000   1850.0       150.0    92%"},
        {t:"warn",s:"⚠️  nfs-backup à 92% ! Prévoir nettoyage ou extension."}
      ],
      "pvesm list local-lvm": () => [
        {t:"ok",s:"Volid                      Format  Type   Size      VMID"},
        {t:"ok",s:"local-lvm:vm-100-disk-0    raw     images 20G       100"},
        {t:"ok",s:"local-lvm:vm-101-disk-0    raw     images 40G       101"},
        {t:"ok",s:"local-lvm:vm-102-disk-0    raw     images 80G       102"},
        {t:"ok",s:"local-lvm:vm-300-disk-0    raw     images 8G        300"}
      ],
      "vzdump 101 --storage nfs-backup --mode snapshot": () => [
        {t:"ok",s:"INFO: starting new backup job: vzdump 101"},
        {t:"ok",s:"INFO: mode 'snapshot' selected (no downtime)"},
        {t:"ok",s:"INFO: creating snapshot for VM 101"},
        {t:"ok",s:"INFO: backup size: 8.2 GB"},
        {t:"ok",s:"INFO: transferred 8.2 GB in 45 seconds (182 MB/s)"},
        {t:"ok",s:"INFO: archive file size: 2.3GB (compressed)"},
        {t:"ok",s:"INFO: Finished Backup of VM 101 (00:00:48)"},
        {t:"ok",s:"INFO: backup saved to: nfs-backup:backup/vzdump-qemu-101-2024_06_12.vma.zst"},
        {t:"info",s:"✅ Mode snapshot = zéro downtime. Modes: snapshot (recommandé), suspend (courte pause), stop (arrêt VM)."}
      ],
      "vzdump 101 --storage nfs-backup --mode stop": () => [
        {t:"warn",s:"INFO: mode 'stop' selected — VM will be stopped during backup"},
        {t:"warn",s:"INFO: stopping VM 101"},
        {t:"ok",s:"INFO: backup started"},
        {t:"ok",s:"INFO: backup size: 8.2 GB — transferred in 38s"},
        {t:"ok",s:"INFO: starting VM 101"},
        {t:"warn",s:"ℹ️  Mode stop = backup cohérent mais downtime. Réserver aux VMs sans snapshot driver."}
      ],
      "cat /etc/network/interfaces": () => [
        {t:"ok",s:"auto lo"},
        {t:"ok",s:"iface lo inet loopback"},
        {t:"ok",s:""},
        {t:"ok",s:"iface eno1 inet manual"},
        {t:"ok",s:""},
        {t:"ok",s:"auto vmbr0"},
        {t:"ok",s:"iface vmbr0 inet static"},
        {t:"ok",s:"        address 192.168.1.10/24"},
        {t:"ok",s:"        gateway 192.168.1.1"},
        {t:"ok",s:"        bridge-ports eno1"},
        {t:"ok",s:"        bridge-stp off"},
        {t:"ok",s:"        bridge-fd 0"},
        {t:"ok",s:""},
        {t:"ok",s:"auto vmbr1"},
        {t:"ok",s:"iface vmbr1 inet manual"},
        {t:"ok",s:"        bridge-ports eno2"},
        {t:"ok",s:"        bridge-stp off"},
        {t:"info",s:"ℹ️  vmbr0 = bridge principal (VMs avec IP externe). vmbr1 = réseau interne/DMZ."}
      ],
      "brctl show": () => [
        {t:"ok",s:"bridge name  bridge id          STP enabled  interfaces"},
        {t:"ok",s:"vmbr0        8000.bc2411aabbcc  no           eno1"},
        {t:"ok",s:"                                             vnet0"},
        {t:"ok",s:"                                             vnet1"},
        {t:"ok",s:"vmbr1        8000.bc2411ccddee  no           eno2"},
        {t:"ok",s:"                                             vnet2"},
        {t:"info",s:"ℹ️  vnetX = interfaces virtuelles des VMs/LXC connectées au bridge."}
      ],
      "pveversion": () => [
        {t:"ok",s:"pve-manager/8.1.4/b46aac3b42f012ab (running kernel: 6.5.13-5-pve)"},
        {t:"ok",s:"proxmox-widget-toolkit: 4.1.4"},
        {t:"ok",s:"pve-web-js: 4.1.4"},
        {t:"ok",s:"pve-docs: 8.1.4"},
        {t:"ok",s:"libpve-storage-perl: 8.1.3"},
        {t:"ok",s:"corosync: 3.1.7"}
      ],
      "journalctl -u pvedaemon -n 20": () => [
        {t:"ok",s:"jun 12 07:00:01 proxmox pvedaemon[1234]: starting server"},
        {t:"ok",s:"jun 12 07:00:02 proxmox pvedaemon[1234]: cluster connection established"},
        {t:"ok",s:"jun 12 09:00:15 proxmox pvedaemon[1234]: VM 101 start"},
        {t:"ok",s:"jun 12 09:00:20 proxmox pvedaemon[1234]: VM 101 started successfully"},
        {t:"warn",s:"jun 12 08:45:10 proxmox pvedaemon[1234]: VM 102 HA fence triggered on node pve-node3"},
        {t:"warn",s:"⚠️  Fence HA détecté — pve-node3 a été isolé pour protéger les données des VMs HA."}
      ],
      "pvesh get /nodes": () => [
        {t:"ok",s:"┌──────────┬────────┬─────────────┬──────────┬────────────┐"},
        {t:"ok",s:"│ node     │ status │ uptime      │ cpu      │ mem        │"},
        {t:"ok",s:"├──────────┼────────┼─────────────┼──────────┼────────────┤"},
        {t:"ok",s:"│ pve-node1│ online │ 5d 03:15:00 │ 12.3%    │ 24G/64G    │"},
        {t:"ok",s:"│ pve-node2│ online │ 5d 03:14:00 │  8.1%    │ 18G/64G    │"},
        {t:"ok",s:"│ pve-node3│ online │ 5d 03:13:00 │  5.2%    │ 12G/64G    │"},
        {t:"ok",s:"└──────────┴────────┴─────────────┴──────────┴────────────┘"}
      ]
    }
  },
  pfsense: {
    label: "🔶 pfSense/HAProxy",
    prompt: "[pfSense]$",
    color: "#fbbf24",
    intro: [
      {t:"ok", s:"pfSense 2.7 + HAProxy — Pare-feu & Load Balancer"},
      {t:"info", s:"Tape 'help' pour voir les commandes disponibles."}
    ],
    commands: {
      "help": () => [
        {t:"head",s:"=== COMMANDES pfSense / HAProxy ==="},
        {t:"ok",s:"pfSense état : pfctl -si, pfctl -ss, pfctl -sr, ifconfig, netstat -rn"},
        {t:"ok",s:"pfSense règles : pfctl -f /etc/pf.conf, pfctl -d/-e (désactiver/activer)"},
        {t:"ok",s:"pfSense NAT : pfctl -sn (show NAT), arp -a"},
        {t:"ok",s:"pfSense VPN : ipsec statusall, openvpn --status /tmp/vpn.status"},
        {t:"ok",s:"pfSense DHCP : cat /var/dhcpd/var/db/dhcpd.leases"},
        {t:"ok",s:"HAProxy stats : cat /tmp/haproxy.stats, echo 'show info' | nc -U /tmp/haproxy.sock"},
        {t:"ok",s:"HAProxy backend : echo 'show servers state' | nc -U /tmp/haproxy.sock"},
        {t:"ok",s:"Logs : clog /var/log/filter.log, clog /var/log/system.log"},
        {t:"info",s:"Tape 'clear' pour vider l'écran."}
      ],
      "pfctl -si": () => [
        {t:"ok",s:"Status: Enabled for 5 days 03:15:42"},
        {t:"ok",s:"Ifname: em0"},
        {t:"ok",s:""},
        {t:"ok",s:"State Table                          Total          Rate"},
        {t:"ok",s:"  current entries                     1842"},
        {t:"ok",s:"  searches                         4218321         9.8/s"},
        {t:"ok",s:"  inserts                            85432         0.2/s"},
        {t:"ok",s:"  removals                           83590         0.2/s"},
        {t:"ok",s:""},
        {t:"ok",s:"Counters"},
        {t:"ok",s:"  match                            4218321         9.8/s"},
        {t:"ok",s:"  bad-offset                             0          0/s"},
        {t:"warn",s:"  fragments                          1234          0.3/s"},
        {t:"warn",s:"ℹ️  Fragments détectés — peut indiquer un MTU mal configuré sur un lien WAN."}
      ],
      "pfctl -ss": () => [
        {t:"ok",s:"all tcp 192.168.1.100:50234 -> 93.184.216.34:443  ESTABLISHED:ESTABLISHED"},
        {t:"ok",s:"all tcp 192.168.1.101:49821 -> 142.250.74.174:443  ESTABLISHED:ESTABLISHED"},
        {t:"ok",s:"all udp 192.168.1.100:53    <- 8.8.8.8:53          SINGLE:MULTIPLE"},
        {t:"ok",s:"all tcp 10.0.0.2:22         -> 192.168.1.10:50100  ESTABLISHED:ESTABLISHED"},
        {t:"info",s:"ℹ️  pfctl -ss = table des états actifs. Filtrer: pfctl -ss | grep '192.168.1.50'"}
      ],
      "pfctl -sr": () => [
        {t:"ok",s:"@1 pass in on em0 inet proto tcp from any to any port 443 flags S/SA keep state"},
        {t:"ok",s:"@2 pass in on em0 inet proto tcp from any to any port 80  flags S/SA keep state"},
        {t:"ok",s:"@3 pass in on em0 inet proto tcp from 192.168.1.0/24 to any port 22"},
        {t:"warn",s:"@4 pass in on em0 from any to any  ← ⚠️  Règle 'pass any' trop permissive !"},
        {t:"ok",s:"@5 block log all"}
      ],
      "pfctl -sn": () => [
        {t:"ok",s:"no nat on lo0 all"},
        {t:"ok",s:"nat on em0 inet from 192.168.1.0/24 to any -> (em0)"},
        {t:"ok",s:"nat on em0 inet from 10.0.0.0/8   to any -> (em0)"},
        {t:"ok",s:"rdr on em0 proto tcp from any to (em0) port 80  -> 192.168.1.100 port 80"},
        {t:"ok",s:"rdr on em0 proto tcp from any to (em0) port 443 -> 192.168.1.100 port 443"},
        {t:"info",s:"ℹ️  nat = NAT sortant (masquerade). rdr = redirection de port (port forwarding)."}
      ],
      "pfctl -f /etc/pf.conf": () => [
        {t:"ok",s:"pfctl: Use of -f option, could result in flushing of rules"},
        {t:"ok",s:"No ALTQ support in kernel"},
        {t:"ok",s:"ALTQ related functions disabled"},
        {t:"ok",s:"pfctl: pf already enabled"},
        {t:"ok",s:"Rules loaded successfully"},
        {t:"info",s:"ℹ️  Recharge le jeu de règles pf depuis /etc/pf.conf. Équivalent d'un 'apply' dans l'interface web."}
      ],
      "pfctl -d": () => [
        {t:"warn",s:"pf disabled"},
        {t:"warn",s:"⚠️  ATTENTION : Le pare-feu est maintenant désactivé ! Tout le trafic passe sans filtrage."},
        {t:"warn",s:"Réactiver immédiatement avec 'pfctl -e' après les opérations de maintenance."}
      ],
      "pfctl -e": () => [
        {t:"ok",s:"pf enabled"},
        {t:"ok",s:"ℹ️  Pare-feu réactivé. Les règles de /etc/pf.conf sont appliquées."}
      ],
      "ifconfig": () => [
        {t:"ok",s:"em0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> metric 0 mtu 1500"},
        {t:"ok",s:"        inet 203.0.113.1 netmask 0xffffff00 broadcast 203.0.113.255"},
        {t:"ok",s:"        ether 00:0c:29:ab:cd:ef"},
        {t:"ok",s:"em1: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> metric 0 mtu 1500"},
        {t:"ok",s:"        inet 192.168.1.1 netmask 0xffffff00 broadcast 192.168.1.255"},
        {t:"ok",s:"        ether 00:0c:29:ab:cd:f0"},
        {t:"ok",s:"lo0: flags=8049<UP,LOOPBACK,RUNNING,MULTICAST> metric 0 mtu 16384"},
        {t:"ok",s:"        inet 127.0.0.1 netmask 0xff000000"},
        {t:"info",s:"ℹ️  em0 = WAN (203.0.113.1), em1 = LAN (192.168.1.1). pfSense agit comme routeur/NAT entre les deux."}
      ],
      "netstat -rn": () => [
        {t:"ok",s:"Routing tables"},
        {t:"ok",s:"Internet:"},
        {t:"ok",s:"Destination     Gateway         Flags    Netif Expire"},
        {t:"ok",s:"default         203.0.113.254   UGS      em0"},
        {t:"ok",s:"192.168.1.0/24  link#2          U        em1"},
        {t:"ok",s:"10.0.0.0/8      192.168.1.254   UGS      em1"},
        {t:"info",s:"ℹ️  La route par défaut sort par em0 (WAN). Le trafic vers 10.0.0.0/8 passe par 192.168.1.254 (routeur interne)."}
      ],
      "arp -a": () => [
        {t:"ok",s:"? (192.168.1.100) at 00:50:79:66:68:00 on em1 expires in 1196 seconds [ethernet]"},
        {t:"ok",s:"? (192.168.1.101) at 00:50:79:66:68:01 on em1 expires in 984 seconds [ethernet]"},
        {t:"ok",s:"? (203.0.113.254) at aa:bb:cc:dd:ee:ff on em0 expires in 1180 seconds [ethernet]"}
      ],
      "cat /var/dhcpd/var/db/dhcpd.leases": () => [
        {t:"ok",s:"lease 192.168.1.100 {"},
        {t:"ok",s:"  starts 1 2024/06/10 07:00:00;"},
        {t:"ok",s:"  ends 2 2024/06/11 07:00:00;"},
        {t:"ok",s:"  binding state active;"},
        {t:"ok",s:"  hardware ethernet 00:50:79:66:68:00;"},
        {t:"ok",s:"  client-hostname \"PC-Alice\";"},
        {t:"ok",s:"}"},
        {t:"ok",s:"lease 192.168.1.101 {"},
        {t:"ok",s:"  starts 1 2024/06/10 08:15:00;"},
        {t:"ok",s:"  ends 2 2024/06/11 08:15:00;"},
        {t:"ok",s:"  binding state active;"},
        {t:"ok",s:"  hardware ethernet 00:50:79:66:68:01;"},
        {t:"ok",s:"  client-hostname \"PC-Bob\";"},
        {t:"ok",s:"}"}
      ],
      "ipsec statusall": () => [
        {t:"ok",s:"Status of IKE charon daemon (strongSwan 5.9.11):"},
        {t:"ok",s:"  uptime: 5 days, since Jun 07 07:00:01 2024"},
        {t:"ok",s:"  malloc: sbrk 2670592, mmap 0, used 533952, free 2136640"},
        {t:"ok",s:"Connections:"},
        {t:"ok",s:"  site-to-site-vpn:  203.0.113.1...198.51.100.1  IKEv2, dpddelay=30s"},
        {t:"ok",s:"Routed Connections:"},
        {t:"ok",s:"  site-to-site-vpn{1}:  INSTALLED, TUNNEL, reqid 1, ESP in UDP SPIs"},
        {t:"ok",s:"    192.168.1.0/24 === 10.10.0.0/24"},
        {t:"ok",s:"Security Associations (1 up, 0 connecting):"},
        {t:"ok",s:"  site-to-site-vpn[1]: ESTABLISHED 5 days ago, 203.0.113.1[203.0.113.1]...198.51.100.1"},
        {t:"info",s:"✅ Tunnel IPsec établi. Trafic 192.168.1.0/24 <-> 10.10.0.0/24 chiffré."}
      ],
      "clog /var/log/filter.log": () => [
        {t:"ok",s:"Jun 12 09:01:22 pfSense filterlog: 5,,,pass,em1,match,in,4,,,tcp,192.168.1.100,93.184.216.34,50234,443"},
        {t:"ok",s:"Jun 12 09:02:15 pfSense filterlog: 5,,,pass,em1,match,in,4,,,tcp,192.168.1.101,142.250.74.174,49821,443"},
        {t:"warn",s:"Jun 12 09:03:01 pfSense filterlog: 5,,,block,em0,match,in,4,,,tcp,45.33.32.156,203.0.113.1,52341,22"},
        {t:"warn",s:"Jun 12 09:03:05 pfSense filterlog: 5,,,block,em0,match,in,4,,,tcp,45.33.32.156,203.0.113.1,52342,22"},
        {t:"warn",s:"⚠️  Tentatives SSH bloquées depuis 45.33.32.156 — bruteforce en cours sur le WAN."}
      ],
      "echo 'show info' | nc -U /tmp/haproxy.sock": () => [
        {t:"ok",s:"Name: HAProxy"},
        {t:"ok",s:"Version: 2.8.3"},
        {t:"ok",s:"Release_date: 2023/08/11"},
        {t:"ok",s:"Nbthread: 4"},
        {t:"ok",s:"Uptime_sec: 432142"},
        {t:"ok",s:"CurrConns: 847"},
        {t:"ok",s:"MaxConn: 4096"},
        {t:"ok",s:"TotalReq: 4218321"},
        {t:"ok",s:"CompressBpsRateIn: 0"},
        {t:"ok",s:"Pid: 5678"},
        {t:"info",s:"ℹ️  847 connexions actives / 4096 max. TotalReq = requêtes traitées depuis le démarrage."}
      ],
      "echo 'show servers state' | nc -U /tmp/haproxy.sock": () => [
        {t:"ok",s:"1"},
        {t:"ok",s:"# be_id  be_name    srv_id  srv_name  srv_addr       srv_op_state  srv_admin_state"},
        {t:"ok",s:"2        web-back   1        web-01    192.168.1.100  2             0"},
        {t:"ok",s:"2        web-back   2        web-02    192.168.1.101  2             0"},
        {t:"warn",s:"2        web-back   3        web-03    192.168.1.102  0             0"},
        {t:"warn",s:"⚠️  web-03 (192.168.1.102) est DOWN (srv_op_state=0). HAProxy redirige vers web-01 et web-02."},
        {t:"info",s:"ℹ️  srv_op_state: 0=DOWN, 2=UP. srv_admin_state: 0=actif, 1=maintenance."}
      ],
      "cat /tmp/haproxy.stats": () => [
        {t:"ok",s:"# pxname,svname,qcur,qmax,scur,smax,slim,stot,bin,bout,dreq,dresp,ereq,econ,eresp,status"},
        {t:"ok",s:"web-front,FRONTEND,0,15,847,1024,4096,4218321,2.1G,48.3G,0,0,1234,0,0,OPEN"},
        {t:"ok",s:"web-back,web-01,0,8,423,512,0,2109160,1.05G,24.2G,0,0,0,12,45,UP"},
        {t:"ok",s:"web-back,web-02,0,7,424,512,0,2109161,1.05G,24.1G,0,0,0,8,32,UP"},
        {t:"warn",s:"web-back,web-03,0,0,0,0,0,0,0,0,0,0,0,0,0,DOWN"},
        {t:"info",s:"ℹ️  bin/bout = bytes in/out. ereq = erreurs requêtes. econ = erreurs connexion backend."}
      ],
      "echo 'show stat' | nc -U /tmp/haproxy.sock": () => [
        {t:"ok",s:"web-front,FRONTEND: status=OPEN  req_rate=24/s  req_tot=4218321"},
        {t:"ok",s:"web-back,BACKEND:  status=UP     qtime=0ms     ctime=1ms   rtime=45ms"},
        {t:"ok",s:"web-back,web-01:   status=UP     check=OK       weight=100"},
        {t:"ok",s:"web-back,web-02:   status=UP     check=OK       weight=100"},
        {t:"warn",s:"web-back,web-03:   status=DOWN   check=L4CON   weight=100"},
        {t:"warn",s:"⚠️  web-03 DOWN avec check=L4CON = connexion TCP refusée. Service arrêté sur le serveur."}
      ],
      "echo 'disable server web-back/web-03' | nc -U /tmp/haproxy.sock": () => [
        {t:"ok",s:"(pas de sortie = commande exécutée)"},
        {t:"ok",s:"web-03 mis en mode maintenance (admin state = MAINT)."},
        {t:"ok",s:"HAProxy ne lui envoie plus de trafic jusqu'à 'enable server web-back/web-03'."},
        {t:"info",s:"ℹ️  Utile pour retirer proprement un serveur du pool avant une maintenance."}
      ],
      "echo 'enable server web-back/web-03' | nc -U /tmp/haproxy.sock": () => [
        {t:"ok",s:"(pas de sortie = commande exécutée)"},
        {t:"ok",s:"web-03 retiré du mode maintenance."},
        {t:"ok",s:"HAProxy reprend les health checks et redirige le trafic si les checks passent."}
      ],
      "haproxy -c -f /etc/haproxy/haproxy.cfg": () => [
        {t:"ok",s:"Configuration file is valid"},
        {t:"info",s:"ℹ️  Toujours valider la config avant un reload: haproxy -c -f /etc/haproxy/haproxy.cfg"},
        {t:"info",s:"Reload sans downtime: service haproxy reload (ou systemctl reload haproxy sur Linux)"}
      ],
      "haproxy -c -f /etc/haproxy/haproxy.cfg 2>&1": () => [
        {t:"err",s:"[ALERT] 163/091542 (1234) : parsing [/etc/haproxy/haproxy.cfg:45]: unknown keyword 'blance' in 'backend' section"},
        {t:"err",s:"[ALERT] 163/091542 (1234) : Error(s) found in configuration file : /etc/haproxy/haproxy.cfg"},
        {t:"err",s:"[ALERT] 163/091542 (1234) : Fatal errors found in configuration."},
        {t:"warn",s:"⚠️  Faute de frappe ligne 45 : 'blance' au lieu de 'balance'. Ne pas reloader avant correction !"}
      ],
      "clog /var/log/system.log": () => [
        {t:"ok",s:"Jun 12 07:00:01 pfSense kernel: pf started"},
        {t:"ok",s:"Jun 12 07:00:05 pfSense dhcpd: Internet Systems Consortium DHCP Server started"},
        {t:"ok",s:"Jun 12 08:45:01 pfSense charon: site-to-site-vpn[1] ESTABLISHED"},
        {t:"warn",s:"Jun 12 09:03:00 pfSense kernel: arp: 192.168.1.50 is on em1 but got reply from 00:de:ad:be:ef:00 on em0"},
        {t:"warn",s:"⚠️  ARP spoofing potentiel détecté ! Une machine répond à une IP sur la mauvaise interface."}
      ]
    }
  },
  ad: {
    label: "🔴 Active Directory",
    prompt: "PS C:\\Windows\\System32>",
    color: "#f87171",
    intro: [
      {t:"ok",  s:"Active Directory — Windows Server 2022"},
      {t:"info",s:"Domaine : corp.local | DC : DC01.corp.local"},
      {t:"info",s:"Connecté en tant que : CORP\\admin"},
      {t:"info",s:"Tape 'help' pour voir les commandes disponibles."}
    ],
    commands: {
      "help": () => [
        {t:"head",s:"=== COMMANDES ACTIVE DIRECTORY DISPONIBLES ==="},
        {t:"ok",s:"Utilisateurs  : net user /domain, dsquery user, Get-ADUser"},
        {t:"ok",s:"Groupes       : net group /domain, dsquery group, Get-ADGroupMember"},
        {t:"ok",s:"Ordinateurs   : dsquery computer, Get-ADComputer"},
        {t:"ok",s:"Domaine/Forêt : Get-ADDomain, Get-ADForest, netdom query fsmo"},
        {t:"ok",s:"Réplication   : repadmin /showrepl, repadmin /replsummary"},
        {t:"ok",s:"Diagnostic    : dcdiag, dcdiag /test:dns, nltest /dclist:corp.local"},
        {t:"ok",s:"GPO           : gpresult /r, Get-GPO -All"},
        {t:"ok",s:"Kerberos      : klist, klist purge, setspn -Q */corp.local"},
        {t:"ok",s:"Audit         : auditpol /get /category:*, Get-WinEvent"},
        {t:"ok",s:"SID/Identité  : whoami /all, whoami /groups"},
        {t:"info",s:"Tape 'clear' pour vider l'écran."}
      ],
      "net user /domain": () => [
        {t:"ok",s:"La commande s'est correctement terminée."},
        {t:"ok",s:""},
        {t:"ok",s:"Comptes d'utilisateurs de \\\\DC01"},
        {t:"ok",s:""},
        {t:"ok",s:"-------------------------------------------------------------------------------"},
        {t:"ok",s:"Administrateur           admin                    alice.dupont"},
        {t:"ok",s:"bob.martin               claire.martin            david.leroy"},
        {t:"ok",s:"Guest                    john.doe                 krbtgt"},
        {t:"ok",s:"svc-backup               svc-sql                  svc-web"},
        {t:"ok",s:"-------------------------------------------------------------------------------"},
        {t:"ok",s:"La commande s'est correctement terminée."},
        {t:"warn",s:"⚠️  Comptes de service (svc-*) visibles — vérifier leurs droits et mots de passe."}
      ],
      "net user john.doe /domain": () => [
        {t:"ok",s:"Nom d'utilisateur                     john.doe"},
        {t:"ok",s:"Nom complet                           John Doe"},
        {t:"ok",s:"Commentaire"},
        {t:"ok",s:"Commentaire de l'utilisateur"},
        {t:"ok",s:"Code du pays/région                   000 (Système par défaut)"},
        {t:"ok",s:"Compte actif                          Oui"},
        {t:"ok",s:"Le compte expire                      Jamais"},
        {t:"ok",s:""},
        {t:"ok",s:"Dernier changement de mot de passe    12/06/2023 09:00:00"},
        {t:"warn",s:"Le mot de passe expire                Jamais"},
        {t:"ok",s:"Le mot de passe peut être changé      12/06/2023 09:00:00"},
        {t:"ok",s:""},
        {t:"ok",s:"Stations de travail autorisées        Tout"},
        {t:"ok",s:"Script d'ouverture de session"},
        {t:"ok",s:"Répertoire de base de l'utilisateur"},
        {t:"ok",s:"Dernier accès                         19/06/2025 14:23:11"},
        {t:"ok",s:""},
        {t:"ok",s:"Heures d'ouverture de session autorisées Tout"},
        {t:"ok",s:""},
        {t:"ok",s:"Membre de                             Domain Users, IT-Support"},
        {t:"ok",s:"La commande s'est correctement terminée."},
        {t:"warn",s:"⚠️  Mot de passe configuré pour ne jamais expirer — risque de sécurité !"}
      ],
      "net group /domain": () => [
        {t:"ok",s:"Comptes de groupes de \\\\DC01"},
        {t:"ok",s:""},
        {t:"ok",s:"-------------------------------------------------------------------------------"},
        {t:"ok",s:"*Cert Publishers             *DHCP Administrators       *DHCP Users"},
        {t:"ok",s:"*DnsAdmins                  *DnsUpdateProxy            *Domain Admins"},
        {t:"ok",s:"*Domain Computers           *Domain Controllers         *Domain Guests"},
        {t:"ok",s:"*Domain Users               *Enterprise Admins          *Group Policy Creator"},
        {t:"ok",s:"*IT-Support                 *Remote Desktop Users       *Schema Admins"},
        {t:"ok",s:"-------------------------------------------------------------------------------"},
        {t:"ok",s:"La commande s'est correctement terminée."}
      ],
      "net group \"Domain Admins\" /domain": () => [
        {t:"ok",s:"Nom du groupe     Domain Admins"},
        {t:"ok",s:"Commentaire       Administrateurs désignés du domaine"},
        {t:"ok",s:""},
        {t:"ok",s:"Membres"},
        {t:"ok",s:"-------------------------------------------------------------------------------"},
        {t:"ok",s:"Administrateur           admin                    svc-backup"},
        {t:"ok",s:"-------------------------------------------------------------------------------"},
        {t:"ok",s:"La commande s'est correctement terminée."},
        {t:"warn",s:"⚠️  svc-backup est membre de Domain Admins — compte de service avec trop de droits !"}
      ],
      "net accounts /domain": () => [
        {t:"ok",s:"Forcer la déconnexion de l'utilisateur à l'expiration du délai  : Non"},
        {t:"ok",s:"Durée minimale du mot de passe (jours)                          : 1"},
        {t:"ok",s:"Longueur minimale du mot de passe                               : 8"},
        {t:"ok",s:"Longueur de l'historique des mots de passe conservés            : 10"},
        {t:"warn",s:"Durée maximale du mot de passe (jours)                          : Illimitée"},
        {t:"ok",s:"Seuil de verrouillage                                           : 5"},
        {t:"ok",s:"Durée de verrouillage (minutes)                                 : 30"},
        {t:"ok",s:"Durée de comptage du verrouillage (minutes)                     : 30"},
        {t:"warn",s:"⚠️  Mots de passe sans expiration — politique non conforme ISO 27001 / ANSSI."}
      ],
      "Get-ADUser -Filter *": () => [
        {t:"ok",s:"DistinguishedName : CN=alice.dupont,OU=Users,DC=corp,DC=local"},
        {t:"ok",s:"Enabled           : True"},
        {t:"ok",s:"Name              : Alice Dupont"},
        {t:"ok",s:"SamAccountName    : alice.dupont"},
        {t:"ok",s:"UserPrincipalName : alice.dupont@corp.local"},
        {t:"ok",s:""},
        {t:"ok",s:"DistinguishedName : CN=bob.martin,OU=Users,DC=corp,DC=local"},
        {t:"ok",s:"Enabled           : True"},
        {t:"ok",s:"Name              : Bob Martin"},
        {t:"ok",s:"SamAccountName    : bob.martin"},
        {t:"ok",s:"UserPrincipalName : bob.martin@corp.local"},
        {t:"ok",s:""},
        {t:"ok",s:"DistinguishedName : CN=svc-backup,OU=ServiceAccounts,DC=corp,DC=local"},
        {t:"ok",s:"Enabled           : True"},
        {t:"ok",s:"Name              : svc-backup"},
        {t:"ok",s:"SamAccountName    : svc-backup"},
        {t:"ok",s:"UserPrincipalName : svc-backup@corp.local"},
        {t:"info",s:"→ 12 utilisateurs au total. Utilise Get-ADUser -Identity <nom> -Properties * pour les détails."}
      ],
      "Get-ADUser -Identity john.doe -Properties *": () => [
        {t:"ok",s:"CN                    : John Doe"},
        {t:"ok",s:"Department            : IT"},
        {t:"ok",s:"Description           : Support Niveau 2"},
        {t:"ok",s:"DisplayName           : John Doe"},
        {t:"ok",s:"DistinguishedName     : CN=john.doe,OU=IT,OU=Users,DC=corp,DC=local"},
        {t:"ok",s:"EmailAddress          : john.doe@corp.local"},
        {t:"ok",s:"Enabled               : True"},
        {t:"ok",s:"LastLogonDate         : 19/06/2025 14:23:11"},
        {t:"warn",s:"PasswordNeverExpires  : True"},
        {t:"ok",s:"PasswordLastSet       : 12/06/2023 09:00:00"},
        {t:"ok",s:"SID                   : S-1-5-21-3874928736-2546254271-2417930603-1105"},
        {t:"ok",s:"MemberOf              : CN=IT-Support,OU=Groups,DC=corp,DC=local"},
        {t:"warn",s:"⚠️  PasswordNeverExpires=True et mot de passe âgé de +2 ans — action requise."}
      ],
      "Get-ADGroupMember \"Domain Admins\"": () => [
        {t:"ok",s:"distinguishedName : CN=Administrateur,CN=Users,DC=corp,DC=local"},
        {t:"ok",s:"name              : Administrateur  | objectClass : user"},
        {t:"ok",s:""},
        {t:"ok",s:"distinguishedName : CN=admin,OU=Admins,DC=corp,DC=local"},
        {t:"ok",s:"name              : admin           | objectClass : user"},
        {t:"ok",s:""},
        {t:"warn",s:"distinguishedName : CN=svc-backup,OU=ServiceAccounts,DC=corp,DC=local"},
        {t:"warn",s:"name              : svc-backup      | objectClass : user  ← ANORMAL"},
        {t:"warn",s:"⚠️  Compte de service svc-backup dans Domain Admins — violation du principe de moindre privilège !"}
      ],
      "Get-ADDefaultDomainPasswordPolicy": () => [
        {t:"ok",s:"ComplexityEnabled           : True"},
        {t:"ok",s:"LockoutDuration             : 00:30:00"},
        {t:"ok",s:"LockoutObservationWindow    : 00:30:00"},
        {t:"ok",s:"LockoutThreshold            : 5"},
        {t:"warn",s:"MaxPasswordAge              : 00:00:00  (illimitée)"},
        {t:"ok",s:"MinPasswordAge              : 1.00:00:00"},
        {t:"ok",s:"MinPasswordLength           : 8"},
        {t:"ok",s:"PasswordHistoryCount        : 10"},
        {t:"ok",s:"ReversibleEncryptionEnabled : False"},
        {t:"warn",s:"⚠️  MaxPasswordAge = 0 signifie que les mots de passe n'expirent jamais — non conforme ANSSI."}
      ],
      "Get-ADDomain": () => [
        {t:"ok",s:"AllowedDNSSuffixes         : {}"},
        {t:"ok",s:"ChildDomains               : {}"},
        {t:"ok",s:"DNSRoot                    : corp.local"},
        {t:"ok",s:"DomainMode                 : Windows2016Domain"},
        {t:"ok",s:"DomainSID                  : S-1-5-21-3874928736-2546254271-2417930603"},
        {t:"ok",s:"Forest                     : corp.local"},
        {t:"ok",s:"InfrastructureMaster       : DC01.corp.local"},
        {t:"ok",s:"Name                       : corp"},
        {t:"ok",s:"NetBIOSName                : CORP"},
        {t:"ok",s:"PDCEmulator                : DC01.corp.local"},
        {t:"ok",s:"RIDMaster                  : DC01.corp.local"},
        {t:"ok",s:"ParentDomain               :"},
        {t:"ok",s:"ReplicaDirectoryServers    : {DC02.corp.local}"}
      ],
      "Get-ADForest": () => [
        {t:"ok",s:"ApplicationPartitions : {DC=ForestDnsZones,DC=corp,DC=local}"},
        {t:"ok",s:"CrossForestReferences : {}"},
        {t:"ok",s:"DomainNamingMaster    : DC01.corp.local"},
        {t:"ok",s:"Domains               : {corp.local}"},
        {t:"ok",s:"ForestMode            : Windows2016Forest"},
        {t:"ok",s:"GlobalCatalogs        : {DC01.corp.local, DC02.corp.local}"},
        {t:"ok",s:"Name                  : corp.local"},
        {t:"ok",s:"RootDomain            : corp.local"},
        {t:"ok",s:"SchemaMaster          : DC01.corp.local"}
      ],
      "Get-ADComputer -Filter *": () => [
        {t:"ok",s:"DistinguishedName : CN=DC01,OU=Domain Controllers,DC=corp,DC=local"},
        {t:"ok",s:"Enabled           : True | Name : DC01"},
        {t:"ok",s:""},
        {t:"ok",s:"DistinguishedName : CN=DC02,OU=Domain Controllers,DC=corp,DC=local"},
        {t:"ok",s:"Enabled           : True | Name : DC02"},
        {t:"ok",s:""},
        {t:"ok",s:"DistinguishedName : CN=WS-ALICE,OU=Workstations,DC=corp,DC=local"},
        {t:"ok",s:"Enabled           : True | Name : WS-ALICE"},
        {t:"ok",s:""},
        {t:"ok",s:"DistinguishedName : CN=WS-BOB,OU=Workstations,DC=corp,DC=local"},
        {t:"ok",s:"Enabled           : True | Name : WS-BOB"},
        {t:"ok",s:""},
        {t:"ok",s:"DistinguishedName : CN=SRV-SQL01,OU=Servers,DC=corp,DC=local"},
        {t:"ok",s:"Enabled           : True | Name : SRV-SQL01"},
        {t:"info",s:"→ 5 ordinateurs dans le domaine."}
      ],
      "netdom query fsmo": () => [
        {t:"ok",s:"Maître de schéma              DC01.corp.local"},
        {t:"ok",s:"Maître d'attribution des noms de domaine  DC01.corp.local"},
        {t:"ok",s:"PDC                           DC01.corp.local"},
        {t:"ok",s:"Pool de RID                   DC01.corp.local"},
        {t:"ok",s:"Maître d'infrastructure        DC01.corp.local"},
        {t:"ok",s:"La commande s'est correctement terminée."},
        {t:"info",s:"→ Tous les rôles FSMO sur DC01. Bonne pratique : distribuer PDC+RID sur DC02 en prod."}
      ],
      "nltest /dclist:corp.local": () => [
        {t:"ok",s:"Obtention de la liste des DC pour le domaine 'corp.local' à partir de '\\\\DC01'."},
        {t:"ok",s:"    DC01.corp.local [PDC]  [DS] Site: Default-First-Site-Name"},
        {t:"ok",s:"    DC02.corp.local        [DS] Site: Default-First-Site-Name"},
        {t:"ok",s:"La commande a réussi"}
      ],
      "repadmin /showrepl": () => [
        {t:"ok",s:"Diagnostics de réplication pour DC01\\Default-First-Site-Name\\DC01"},
        {t:"ok",s:""},
        {t:"ok",s:"=== INBOUND NEIGHBORS ==="},
        {t:"ok",s:"DC=corp,DC=local"},
        {t:"ok",s:"    Default-First-Site-Name\\DC02 via RPC"},
        {t:"ok",s:"        DC object GUID: a1b2c3d4-e5f6-7890-abcd-ef1234567890"},
        {t:"ok",s:"        Last attempt @ 2025-06-19 14:00:01 was successful."},
        {t:"ok",s:"        Last success @ 2025-06-19 14:00:01"},
        {t:"ok",s:"        0 consecutive failure(s)."},
        {t:"ok",s:""},
        {t:"ok",s:"CN=Schema,CN=Configuration,DC=corp,DC=local"},
        {t:"ok",s:"    Default-First-Site-Name\\DC02 via RPC"},
        {t:"ok",s:"        Last attempt @ 2025-06-19 13:30:01 was successful."},
        {t:"ok",s:"        0 consecutive failure(s)."},
        {t:"ok",s:"=== La réplication fonctionne correctement. ==="}
      ],
      "repadmin /replsummary": () => [
        {t:"ok",s:"Replication Summary Start Time: 2025-06-19 14:05:22"},
        {t:"ok",s:""},
        {t:"ok",s:"Beginning data collection for replication summary, this may take awhile:"},
        {t:"ok",s:"  ...."},
        {t:"ok",s:""},
        {t:"ok",s:"Source DSA          largest delta    fails/total    %%  error"},
        {t:"ok",s:" DC02                    00m:32s    0 /   5    0"},
        {t:"ok",s:""},
        {t:"ok",s:"Destination DSA     largest delta    fails/total    %%  error"},
        {t:"ok",s:" DC02                    00m:32s    0 /   5    0"},
        {t:"ok",s:""},
        {t:"ok",s:"=== Pas d'erreur de réplication détectée. ==="}
      ],
      "dcdiag": () => [
        {t:"ok",s:"Directory Server Diagnosis"},
        {t:"ok",s:"Performing initial setup:"},
        {t:"ok",s:"   Trying to find home server..."},
        {t:"ok",s:"   Home Server = DC01"},
        {t:"ok",s:"   * Identified AD Forest."},
        {t:"ok",s:"   Done gathering initial info."},
        {t:"ok",s:""},
        {t:"ok",s:"Doing initial required tests"},
        {t:"ok",s:""},
        {t:"ok",s:"   Testing server: Default-First-Site-Name\\DC01"},
        {t:"ok",s:"      Starting test: Connectivity"},
        {t:"ok",s:"         ......................... DC01 passed test Connectivity"},
        {t:"ok",s:"      Starting test: Replications"},
        {t:"ok",s:"         ......................... DC01 passed test Replications"},
        {t:"ok",s:"      Starting test: NCSecDesc"},
        {t:"ok",s:"         ......................... DC01 passed test NCSecDesc"},
        {t:"ok",s:"      Starting test: NetLogons"},
        {t:"ok",s:"         ......................... DC01 passed test NetLogons"},
        {t:"ok",s:"      Starting test: Advertising"},
        {t:"ok",s:"         ......................... DC01 passed test Advertising"},
        {t:"ok",s:"      Starting test: KnowsOfRoleHolders"},
        {t:"ok",s:"         ......................... DC01 passed test KnowsOfRoleHolders"},
        {t:"ok",s:"      Starting test: RidManager"},
        {t:"ok",s:"         ......................... DC01 passed test RidManager"},
        {t:"ok",s:"      Starting test: MachineAccount"},
        {t:"ok",s:"         ......................... DC01 passed test MachineAccount"},
        {t:"ok",s:"      Starting test: Services"},
        {t:"ok",s:"         ......................... DC01 passed test Services"},
        {t:"ok",s:"      Starting test: SystemLog"},
        {t:"warn",s:"         ......................... DC01 failed test SystemLog"},
        {t:"warn",s:"         An error event occurred.  EventID: 0x00000457  Source: SAM"},
        {t:"warn",s:"         Message: Failed to enumerate groups. Error: 0x0000054B (domaine introuvable)."},
        {t:"info",s:"→ dcdiag /fix ou redémarrage du service Netlogon peut résoudre ce problème."}
      ],
      "dcdiag /test:dns": () => [
        {t:"ok",s:"TEST: Basic (Basc)"},
        {t:"ok",s:"   DC01 (DC01) passed test Basc"},
        {t:"ok",s:"TEST: Forwarders/Root Hints (Frwd)"},
        {t:"ok",s:"   Name resolution is functional. _ldap._tcp SRV records OK."},
        {t:"ok",s:"   DC01 (DC01) passed test Frwd"},
        {t:"ok",s:"TEST: Dynamic Update (Dyn)"},
        {t:"ok",s:"   Test record _dcdiag_test_record added successfully in zone corp.local"},
        {t:"ok",s:"   DC01 (DC01) passed test Dyn"},
        {t:"ok",s:"TEST: Delegations (Del)"},
        {t:"ok",s:"   DC01 (DC01) passed test Del"},
        {t:"ok",s:"TEST: Records registration (RReg)"},
        {t:"ok",s:"   Network Adapter [00000005] : DC01.corp.local"},
        {t:"ok",s:"      All necessary records registered on DC01 DNS."},
        {t:"ok",s:"   DC01 (DC01) passed test RReg"},
        {t:"ok",s:"=== DNS fonctionne correctement sur DC01. ==="}
      ],
      "gpresult /r": () => [
        {t:"ok",s:"Microsoft (R) Windows (R) Operating System Group Policy Result tool v2.0"},
        {t:"ok",s:""},
        {t:"ok",s:"INFORMATIONS SUR L'ORDINATEUR"},
        {t:"ok",s:"    Nom du site : Default-First-Site-Name"},
        {t:"ok",s:"    Nom du domaine : CORP"},
        {t:"ok",s:"    Nom d'utilisateur connecté : admin"},
        {t:"ok",s:""},
        {t:"ok",s:"PARAMÈTRES DE L'ORDINATEUR"},
        {t:"ok",s:"    Nom d'hôte : DC01"},
        {t:"ok",s:"    Dernière fois que la stratégie de groupe a été appliquée : 19/06/2025 à 08:00:05"},
        {t:"ok",s:""},
        {t:"ok",s:"    La stratégie de groupe a été appliquée à partir de : DC01.corp.local"},
        {t:"ok",s:"    Stratégie de groupe appliquée :"},
        {t:"ok",s:"        Default Domain Policy"},
        {t:"ok",s:"        Default Domain Controllers Policy"},
        {t:"ok",s:"        Stratégie-Securite-Postes"},
        {t:"ok",s:"        Stratégie-Antivirus"},
        {t:"ok",s:""},
        {t:"ok",s:"PARAMÈTRES UTILISATEUR"},
        {t:"ok",s:"    Stratégies appliquées :"},
        {t:"ok",s:"        Default Domain Policy"}
      ],
      "Get-GPO -All": () => [
        {t:"ok",s:"DisplayName      : Default Domain Policy"},
        {t:"ok",s:"DomainName       : corp.local | GpoStatus : AllSettingsEnabled"},
        {t:"ok",s:"CreationTime     : 01/01/2020 10:00:00 | ModificationTime: 15/05/2025"},
        {t:"ok",s:""},
        {t:"ok",s:"DisplayName      : Default Domain Controllers Policy"},
        {t:"ok",s:"DomainName       : corp.local | GpoStatus : AllSettingsEnabled"},
        {t:"ok",s:"CreationTime     : 01/01/2020 10:00:00 | ModificationTime: 01/03/2025"},
        {t:"ok",s:""},
        {t:"ok",s:"DisplayName      : Stratégie-Securite-Postes"},
        {t:"ok",s:"DomainName       : corp.local | GpoStatus : AllSettingsEnabled"},
        {t:"ok",s:"CreationTime     : 10/06/2022 14:30:00 | ModificationTime: 19/06/2025"},
        {t:"ok",s:""},
        {t:"ok",s:"DisplayName      : Stratégie-Antivirus"},
        {t:"ok",s:"DomainName       : corp.local | GpoStatus : AllSettingsEnabled"},
        {t:"ok",s:"CreationTime     : 15/03/2023 09:15:00 | ModificationTime: 12/04/2025"},
        {t:"info",s:"→ 4 GPO actives. Utilise Get-GPOReport pour un rapport HTML détaillé."}
      ],
      "whoami /all": () => [
        {t:"ok",s:"INFORMATIONS UTILISATEUR"},
        {t:"ok",s:"--------------------"},
        {t:"ok",s:"Nom d'utilisateur     SID"},
        {t:"ok",s:"===================== ============================================"},
        {t:"ok",s:"corp\\admin            S-1-5-21-3874928736-2546254271-2417930603-500"},
        {t:"ok",s:""},
        {t:"ok",s:"INFORMATIONS DE GROUPE"},
        {t:"ok",s:"----------------------"},
        {t:"ok",s:"Nom de groupe                  Type             SID"},
        {t:"ok",s:"============================== ================ ========================"},
        {t:"ok",s:"Tout le monde                  Groupe bien connu S-1-1-0"},
        {t:"ok",s:"BUILTIN\\Administrateurs        Alias            S-1-5-32-544"},
        {t:"ok",s:"CORP\\Domain Admins             Groupe           S-1-5-21-...-512"},
        {t:"ok",s:"CORP\\Enterprise Admins         Groupe           S-1-5-21-...-519"},
        {t:"ok",s:"NT AUTHORITY\\Utilisateurs auth Groupe bien connu S-1-5-11"},
        {t:"ok",s:""},
        {t:"ok",s:"INFORMATIONS DE PRIVILÈGES"},
        {t:"ok",s:"--------------------------"},
        {t:"ok",s:"Nom du privilège               Etat"},
        {t:"ok",s:"============================== ======="},
        {t:"ok",s:"SeDebugPrivilege               Activé"},
        {t:"ok",s:"SeImpersonatePrivilege         Activé"},
        {t:"ok",s:"SeTakeOwnershipPrivilege       Activé"},
        {t:"ok",s:"SeLoadDriverPrivilege          Activé"}
      ],
      "whoami /groups": () => [
        {t:"ok",s:"Nom de groupe                          Type   SID         Attributs"},
        {t:"ok",s:"====================================== ====== =========== ========================"},
        {t:"ok",s:"Tout le monde                          Bien   S-1-1-0     Obligatoire, Activé"},
        {t:"ok",s:"BUILTIN\\Administrateurs               Alias  S-1-5-32-544 Obligatoire, Activé"},
        {t:"ok",s:"CORP\\Domain Admins                    Groupe S-1-5-21-...-512 Obligatoire, Activé"},
        {t:"ok",s:"CORP\\Enterprise Admins                Groupe S-1-5-21-...-519 Obligatoire, Activé"},
        {t:"ok",s:"CORP\\Group Policy Creator Owners      Groupe S-1-5-21-...-520 Obligatoire, Activé"},
        {t:"ok",s:"CORP\\Schema Admins                    Groupe S-1-5-21-...-518 Obligatoire, Activé"}
      ],
      "klist": () => [
        {t:"ok",s:"Tickets de cache actuel : (3)"},
        {t:"ok",s:""},
        {t:"ok",s:"#0> CLIENT: admin @ CORP.LOCAL"},
        {t:"ok",s:"    Serveur : krbtgt/CORP.LOCAL @ CORP.LOCAL"},
        {t:"ok",s:"    Type chiff : AES-256-CTS-HMAC-SHA1-96"},
        {t:"ok",s:"    Indicateurs : 0x40e10000  -> forwardable renewable initial pre_authent"},
        {t:"ok",s:"    Heure début : 19/06/2025 08:00:00 (local)"},
        {t:"ok",s:"    Heure fin   : 19/06/2025 18:00:00 (local)"},
        {t:"ok",s:"    Heure renouvellement : 26/06/2025 08:00:00 (local)"},
        {t:"ok",s:""},
        {t:"ok",s:"#1> CLIENT: admin @ CORP.LOCAL"},
        {t:"ok",s:"    Serveur : cifs/DC01.corp.local @ CORP.LOCAL"},
        {t:"ok",s:"    Type chiff : AES-256-CTS-HMAC-SHA1-96"},
        {t:"ok",s:"    Heure début : 19/06/2025 08:05:12 (local)"},
        {t:"ok",s:"    Heure fin   : 19/06/2025 18:00:00 (local)"},
        {t:"info",s:"→ TGT valide 10h, TGS pour CIFS/DC01. Normal en environnement AD."}
      ],
      "klist purge": () => [
        {t:"ok",s:"Suppression de tous les tickets :"},
        {t:"ok",s:"    Suppression de ticket [0]"},
        {t:"ok",s:"    Suppression de ticket [1]"},
        {t:"ok",s:"    Suppression de ticket [2]"},
        {t:"ok",s:"Tickets purgés !"},
        {t:"info",s:"→ Tous les tickets Kerberos supprimés. Un nouveau TGT sera demandé à la prochaine auth."}
      ],
      "setspn -Q */corp.local": () => [
        {t:"ok",s:"Checking domain DC=corp,DC=local"},
        {t:"ok",s:"CN=DC01,OU=Domain Controllers,DC=corp,DC=local"},
        {t:"ok",s:"    HOST/DC01"},
        {t:"ok",s:"    HOST/DC01.corp.local"},
        {t:"ok",s:"    GC/DC01.corp.local/corp.local"},
        {t:"ok",s:"    ldap/DC01.corp.local/corp.local"},
        {t:"ok",s:"CN=svc-sql,OU=ServiceAccounts,DC=corp,DC=local"},
        {t:"warn",s:"    MSSQLSvc/SRV-SQL01.corp.local:1433"},
        {t:"warn",s:"    MSSQLSvc/SRV-SQL01:1433"},
        {t:"ok",s:"CN=svc-web,OU=ServiceAccounts,DC=corp,DC=local"},
        {t:"ok",s:"    HTTP/intranet.corp.local"},
        {t:"ok",s:"Existing SPN found!"},
        {t:"warn",s:"⚠️  svc-sql a des SPN enregistrés → vulnérable au Kerberoasting si mot de passe faible."}
      ],
      "auditpol /get /category:*": () => [
        {t:"ok",s:"System audit policy"},
        {t:"ok",s:"Category/Subcategory                      Setting"},
        {t:"ok",s:"System"},
        {t:"ok",s:"  Security System Extension                Success and Failure"},
        {t:"ok",s:"  System Integrity                         Success and Failure"},
        {t:"ok",s:"Logon/Logoff"},
        {t:"ok",s:"  Logon                                    Success and Failure"},
        {t:"ok",s:"  Logoff                                   Success"},
        {t:"ok",s:"  Account Lockout                          Success"},
        {t:"ok",s:"Object Access"},
        {t:"warn",s:"  File System                             No Auditing"},
        {t:"warn",s:"  Registry                                No Auditing"},
        {t:"ok",s:"Account Management"},
        {t:"ok",s:"  User Account Management                  Success and Failure"},
        {t:"ok",s:"  Security Group Management                Success and Failure"},
        {t:"warn",s:"  Computer Account Management             No Auditing"},
        {t:"warn",s:"⚠️  Audit Système de fichiers et Registre désactivés — non conforme aux recommandations ANSSI."}
      ],
      "dsquery user": () => [
        {t:"ok",s:"\"CN=Administrateur,CN=Users,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=admin,OU=Admins,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=alice.dupont,OU=IT,OU=Users,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=bob.martin,OU=IT,OU=Users,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=john.doe,OU=IT,OU=Users,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=svc-backup,OU=ServiceAccounts,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=svc-sql,OU=ServiceAccounts,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=svc-web,OU=ServiceAccounts,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=krbtgt,CN=Users,DC=corp,DC=local\""}
      ],
      "dsquery user -name admin*": () => [
        {t:"ok",s:"\"CN=admin,OU=Admins,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=Administrateur,CN=Users,DC=corp,DC=local\""},
        {t:"info",s:"→ 2 comptes avec préfixe 'admin' trouvés dans le domaine corp.local"}
      ],
      "dsquery computer": () => [
        {t:"ok",s:"\"CN=DC01,OU=Domain Controllers,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=DC02,OU=Domain Controllers,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=WS-ALICE,OU=Workstations,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=WS-BOB,OU=Workstations,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=SRV-SQL01,OU=Servers,DC=corp,DC=local\""}
      ],
      "dsquery group": () => [
        {t:"ok",s:"\"CN=Domain Admins,CN=Users,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=Enterprise Admins,CN=Users,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=Schema Admins,CN=Users,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=IT-Support,OU=Groups,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=Remote Desktop Users,CN=Builtin,DC=corp,DC=local\""},
        {t:"ok",s:"\"CN=DnsAdmins,CN=Users,DC=corp,DC=local\""}
      ],
      "Get-ADOrganizationalUnit -Filter *": () => [
        {t:"ok",s:"DistinguishedName : OU=Admins,DC=corp,DC=local"},
        {t:"ok",s:"Name              : Admins"},
        {t:"ok",s:""},
        {t:"ok",s:"DistinguishedName : OU=IT,OU=Users,DC=corp,DC=local"},
        {t:"ok",s:"Name              : IT"},
        {t:"ok",s:""},
        {t:"ok",s:"DistinguishedName : OU=ServiceAccounts,DC=corp,DC=local"},
        {t:"ok",s:"Name              : ServiceAccounts"},
        {t:"ok",s:""},
        {t:"ok",s:"DistinguishedName : OU=Workstations,DC=corp,DC=local"},
        {t:"ok",s:"Name              : Workstations"},
        {t:"ok",s:""},
        {t:"ok",s:"DistinguishedName : OU=Servers,DC=corp,DC=local"},
        {t:"ok",s:"Name              : Servers"}
      ]
    }
  }
};

// ═══════════════════════════════════════════
// SCÉNARIOS GUIDÉS
// ═══════════════════════════════════════════
const TERM_SCENARIOS = [
  {
    id:"forensic-linux",
    label:"🔍 Forensique Linux",
    shell:"linux",
    desc:"Un serveur web a été compromis. Identifie l'attaquant étape par étape.",
    steps:[
      {
        titre:"Étape 1 — Vérifier les connexions actives",
        contexte:"Le serveur répond lentement. Commence par voir qui est connecté.",
        hint:"Utilise 'ss -tp' pour voir les sessions TCP établies avec les PIDs.",
        expected:["ss -tp","ss"],
        output:[{t:"ok",s:"State     Recv-Q  Send-Q  Local Address:Port          Peer Address:Port"},{t:"ok",s:"ESTAB     0       0       192.168.1.100:22           192.168.1.10:50234  users:((\"sshd\",pid=2001))"},{t:"warn",s:"ESTAB     0       52      192.168.1.100:443          45.33.32.156:41290  users:((\"reverse_shell\",pid=9999))"},{t:"warn",s:"⚠️  Connexion suspecte ! 45.33.32.156 est une IP de Shodan (scanner connu). PID 9999 = 'reverse_shell' ?"}],
        explication:"Une connexion HTTPS établie depuis une IP externe suspecte avec un processus nommé 'reverse_shell' — signal d'alarme évident."
      },
      {
        titre:"Étape 2 — Identifier le processus suspect",
        contexte:"PID 9999 est suspect. Cherche de quel fichier il provient.",
        hint:"Utilise 'ls -la /proc/9999/exe' pour voir le binaire exécuté par ce PID.",
        expected:["ls -la /proc/9999/exe","ls -la /proc"],
        output:[{t:"warn",s:"lrwxrwxrwx 1 www-data www-data 0 jun 12 08:47 /proc/9999/exe -> /tmp/.hidden/rshell"},{t:"warn",s:"⚠️  Binaire dans /tmp/.hidden — dossier caché dans /tmp = très suspect !"},{t:"err",s:"Un attaquant a déposé un reverse shell dans /tmp et l'a lancé sous www-data."}],
        explication:"/tmp est souvent world-writable. Les attaquants y déposent leurs outils. Un binaire caché (dossier .hidden) est un signe classique de compromission."
      },
      {
        titre:"Étape 3 — Chercher les fichiers SUID suspects",
        contexte:"L'attaquant a peut-être installé une backdoor SUID pour escalader ses privilèges.",
        hint:"Utilise 'find / -perm -4000 -type f 2>/dev/null' pour lister les fichiers SUID.",
        expected:["find / -perm -4000","find /"],
        output:[{t:"warn",s:"=== Fichiers SUID trouvés ==="},{t:"ok",s:"/usr/bin/sudo"},{t:"ok",s:"/usr/bin/passwd"},{t:"ok",s:"/usr/bin/su"},{t:"warn",s:"/tmp/.hidden/rshell"},{t:"err",s:"⚠️  /tmp/.hidden/rshell a le bit SUID ! S'exécute en root même lancé par www-data."},{t:"err",s:"→ Action immédiate : isoler le serveur, copier /tmp/.hidden/ pour analyse, rm -f."}],
        explication:"Un fichier SUID appartenant à root dans /tmp = escalade de privilèges. L'attaquant peut devenir root depuis n'importe quel compte."
      },
      {
        titre:"Étape 4 — Analyser les logs d'authentification",
        contexte:"Comment l'attaquant est-il entré ? Cherche dans auth.log.",
        hint:"Utilise 'grep Failed password /var/log/auth.log'",
        expected:["grep 'Failed password' /var/log/auth.log","grep Failed"],
        output:[{t:"warn",s:"jun 12 08:43:11 linux sshd: Failed password for root from 45.33.32.156 port 41029"},{t:"warn",s:"jun 12 08:43:12 linux sshd: Failed password for root from 45.33.32.156 port 41030"},{t:"warn",s:"jun 12 08:43:13 linux sshd: Failed password for admin from 45.33.32.156 port 41031"},{t:"ok", s:"jun 12 08:44:01 linux sshd: Accepted password for www-data from 45.33.32.156 port 41089"},{t:"err",s:"⚠️  Bruteforce SSH depuis 45.33.32.156 → succès sur le compte www-data (mot de passe faible !)"},{t:"info",s:"→ Solution : fail2ban + interdire login SSH avec mot de passe (PasswordAuthentication no)"}],
        explication:"Bruteforce SSH classique. www-data ne devrait jamais avoir de shell SSH. Bannir les logins par mot de passe et activer fail2ban."
      },
      {
        titre:"Étape 5 — Calculer le hash du binaire malveillant",
        contexte:"Avant de supprimer le fichier, calcule son hash pour le rapport d'incident.",
        hint:"Utilise 'sha256sum' sur le fichier suspect.",
        expected:["sha256sum /tmp/.hidden/rshell","sha256sum"],
        output:[{t:"ok",s:"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  /tmp/.hidden/rshell"},{t:"info",s:"Hash SHA-256 enregistré pour le rapport d'incident."},{t:"info",s:"→ Vérifiable sur VirusTotal pour confirmer s'il s'agit d'un malware connu."},{t:"head",s:"=== 🏆 SCÉNARIO TERMINÉ ==="},{t:"ok",s:"Tu as : identifié la connexion suspecte, localisé le binaire, trouvé le SUID, analysé les logs, hashé la preuve."},{t:"ok",s:"Rapport d'incident complet : IP attaquant, vecteur d'entrée (SSH brute-force www-data), persistance (SUID /tmp)."}],
        explication:"Le hash SHA-256 est la preuve forensique irréfutable. Il permet de comparer le fichier à des bases de malwares connus (VirusTotal, MalwareBazaar)."
      }
    ]
  },
  {
    id:"hardening-linux",
    label:"🛡️ Durcissement SSH",
    shell:"linux",
    desc:"Durcis un serveur Linux fraîchement installé : SSH, firewall, fail2ban.",
    steps:[
      {
        titre:"Étape 1 — Vérifier les ports ouverts",
        contexte:"Avant de durcir, fais l'état des lieux des services exposés.",
        hint:"Utilise 'ss -tulnp' pour lister tous les ports en écoute.",
        expected:["ss -tulnp","ss"],
        output:[{t:"ok",s:"Netid  State   Local Address:Port  Process"},{t:"warn",s:"tcp    LISTEN  0.0.0.0:22         sshd (pid=1234)"},{t:"warn",s:"tcp    LISTEN  0.0.0.0:23         telnetd (pid=555)"},{t:"warn",s:"tcp    LISTEN  0.0.0.0:21         vsftpd (pid=666)"},{t:"warn",s:"⚠️  Telnet (23) et FTP (21) sont actifs ! Ces protocoles transmettent en clair."}],
        explication:"Telnet et FTP transmettent tout en clair, y compris les mots de passe. À couper immédiatement et remplacer par SSH/SFTP."
      },
      {
        titre:"Étape 2 — Configurer le firewall UFW",
        contexte:"Active le firewall et n'autorise que SSH (22).",
        hint:"Tape 'ufw status verbose' pour voir l'état actuel.",
        expected:["ufw status verbose","ufw"],
        output:[{t:"warn",s:"Status: inactive"},{t:"warn",s:"⚠️  UFW est désactivé ! Le serveur est totalement exposé."},{t:"info",s:"→ Commandes à appliquer :"},{t:"info",s:"  ufw default deny incoming"},{t:"info",s:"  ufw allow 22/tcp"},{t:"info",s:"  ufw enable"},{t:"ok",s:"(simulation) UFW activé — seul le port 22 est autorisé en entrée."}],
        explication:"Le principe : tout refuser par défaut, n'autoriser que ce qui est nécessaire. UFW est le frontend simplifié d'iptables sur Debian/Ubuntu."
      },
      {
        titre:"Étape 3 — Vérifier la config SSH",
        contexte:"Le fichier /etc/ssh/sshd_config contient des paramètres critiques de sécurité.",
        hint:"Utilise 'cat /etc/ssh/sshd_config' pour voir la configuration.",
        expected:["cat /etc/ssh/sshd_config","cat /etc/ssh"],
        output:[{t:"ok",s:"# /etc/ssh/sshd_config"},{t:"warn",s:"PermitRootLogin yes          # ⚠️  À mettre à 'no' !"},{t:"warn",s:"PasswordAuthentication yes   # ⚠️  À mettre à 'no' (utiliser les clés)"},{t:"ok",s:"PubkeyAuthentication yes"},{t:"warn",s:"X11Forwarding yes            # ⚠️  Inutile sur serveur, à désactiver"},{t:"info",s:"→ Valeurs recommandées : PermitRootLogin no | PasswordAuthentication no | X11Forwarding no"}],
        explication:"PermitRootLogin no empêche les attaques bruteforce directes sur root. PasswordAuthentication no force l'utilisation de clés SSH — incomparablement plus sûr."
      },
      {
        titre:"Étape 4 — Générer une clé SSH Ed25519",
        contexte:"Avant de désactiver les mots de passe SSH, génère une paire de clés.",
        hint:"Utilise 'ssh-keygen -t ed25519'",
        expected:["ssh-keygen -t ed25519","ssh-keygen"],
        output:[{t:"ok",s:"Generating public/private ed25519 key pair."},{t:"ok",s:"Enter file: /home/user/.ssh/id_ed25519"},{t:"ok",s:"Your identification has been saved in /home/user/.ssh/id_ed25519"},{t:"ok",s:"Your public key has been saved in /home/user/.ssh/id_ed25519.pub"},{t:"ok",s:"SHA256:abc123def456... user@linux"},{t:"info",s:"✅ Ed25519 est plus court et plus sûr que RSA 4096. Copie la clé publique avec ssh-copy-id."}],
        explication:"Ed25519 utilise la cryptographie sur courbes elliptiques (Edwards). Clé plus courte, génération plus rapide, résistant aux attaques par timing."
      },
      {
        titre:"Étape 5 — Installer et vérifier fail2ban",
        contexte:"fail2ban bloque automatiquement les IPs après plusieurs échecs SSH.",
        hint:"Utilise 'fail2ban-client status sshd'",
        expected:["fail2ban-client status sshd","fail2ban-client"],
        output:[{t:"ok",s:"Status for the jail: sshd"},{t:"ok",s:"|- Filter: Currently failed: 3 | Total failed: 47"},{t:"ok",s:"`- Actions: Currently banned: 2 | Total banned: 5"},{t:"ok",s:"   Banned IP list: 45.33.32.156  178.62.43.89"},{t:"head",s:"=== 🏆 SERVEUR DURCI ==="},{t:"ok",s:"✅ UFW actif (deny in, allow 22)"},{t:"ok",s:"✅ SSH : PermitRootLogin no + PasswordAuthentication no"},{t:"ok",s:"✅ Clé Ed25519 générée"},{t:"ok",s:"✅ fail2ban opérationnel (2 IPs bannies)"}],
        explication:"fail2ban lit les logs et bannit via iptables/nftables. Paramètres clés : maxretry (défaut 5), bantime (défaut 10min → augmenter à 1h+), findtime."
      }
    ]
  },
  {
    id:"vlan-cisco",
    label:"🔵 Config VLAN Cisco",
    shell:"cisco",
    desc:"Vérifie et diagnostique une configuration VLAN sur un switch Cisco.",
    steps:[
      {
        titre:"Étape 1 — État des interfaces",
        contexte:"Un utilisateur ne peut pas accéder au réseau. Commence par l'état des interfaces.",
        hint:"Utilise 'show ip interface brief'",
        expected:["show ip interface brief","show ip int brief","show ip int"],
        output:[{t:"ok",s:"Interface            IP-Address      OK? Method Status   Protocol"},{t:"ok",s:"GigabitEthernet0/0   192.168.1.1     YES manual up       up"},{t:"ok",s:"GigabitEthernet0/1   10.0.0.1        YES manual up       up"},{t:"warn",s:"GigabitEthernet0/2   unassigned      YES unset  down     down"},{t:"warn",s:"⚠️  Gi0/2 est DOWN/DOWN — vérifier le câble ou la configuration shutdown."}],
        explication:"'down/down' = problème physique (câble) ou interface en shutdown. 'up/down' = problème de protocole (encapsulation, VLAN natif, etc.)."
      },
      {
        titre:"Étape 2 — Vérifier les VLANs configurés",
        contexte:"L'utilisateur est dans le VLAN 10. Vérifie que ce VLAN existe et quels ports il contient.",
        hint:"Utilise 'show vlan brief'",
        expected:["show vlan brief","show vlan"],
        output:[{t:"ok",s:"VLAN Name                             Status    Ports"},{t:"ok",s:"1    default                          active    Gi0/0, Gi0/3"},{t:"ok",s:"10   PRODUCTION                       active    Gi0/1, Gi0/2, Gi0/4"},{t:"ok",s:"20   MANAGEMENT                       active    Gi0/5"},{t:"ok",s:"99   NATIVE                           active"},{t:"info",s:"ℹ️  Gi0/2 est dans le VLAN 10 mais elle est DOWN — problème physique ou shutdown."}],
        explication:"show vlan brief montre uniquement les ports ACCESS. Les ports TRUNK n'apparaissent pas ici — utilise show interfaces trunk pour les voir."
      },
      {
        titre:"Étape 3 — Vérifier le trunk",
        contexte:"Le switch est connecté à un routeur via trunk. Vérifie que le VLAN 10 passe bien.",
        hint:"Utilise 'show interfaces trunk'",
        expected:["show interfaces trunk","show int trunk"],
        output:[{t:"ok",s:"Port        Mode  Encapsulation  Status   Native vlan"},{t:"ok",s:"Gi0/10      on    802.1q         trunking  99"},{t:"ok",s:""},{t:"ok",s:"Port        Vlans allowed on trunk"},{t:"ok",s:"Gi0/10      10,20,99"},{t:"ok",s:""},{t:"warn",s:"Port        Vlans in spanning tree forwarding state"},{t:"warn",s:"Gi0/10      20,99   ← VLAN 10 absent !"},{t:"err",s:"⚠️  VLAN 10 bloqué par STP sur le trunk ! Vérifier le Spanning Tree pour ce VLAN."}],
        explication:"Un VLAN peut être 'allowed' sur un trunk mais bloqué par STP. C'est souvent dû à une boucle détectée ou à une mauvaise configuration de PortFast."
      },
      {
        titre:"Étape 4 — Analyser le Spanning Tree",
        contexte:"STP bloque VLAN 10. Analyse l'état du Spanning Tree pour ce VLAN.",
        hint:"Utilise 'show spanning-tree'",
        expected:["show spanning-tree","show span"],
        output:[{t:"ok",s:"VLAN0010"},{t:"ok",s:"  Spanning tree enabled protocol rstp"},{t:"ok",s:"  Root ID Priority 24586  Address aabb.cc00.0100"},{t:"ok",s:"  This bridge is the root"},{t:"ok",s:""},{t:"ok",s:"Interface  Role  Sts  Cost  Type"},{t:"warn",s:"Gi0/10     Altn  BLK  4     P2p   ← port bloqué par STP !"},{t:"info",s:"→ Solution : vérifier s'il y a une boucle réelle ou configurer 'spanning-tree portfast' sur les ports access."}],
        explication:"RSTP bloque les ports redondants pour éviter les boucles. Si ce port ne crée pas de boucle, 'spanning-tree portfast' le fait passer en Forwarding immédiatement."
      },
      {
        titre:"Étape 5 — Vérifier la table ARP et MAC",
        contexte:"Après correction du STP, vérifie que les adresses MAC sont apprises.",
        hint:"Utilise 'show mac address-table'",
        expected:["show mac address-table","show mac"],
        output:[{t:"ok",s:"Vlan    Mac Address       Type      Ports"},{t:"ok",s:"  10    0050.7966.6800   DYNAMIC   Gi0/1"},{t:"ok",s:"  10    0050.7966.6802   DYNAMIC   Gi0/2"},{t:"ok",s:"  20    aabb.cc00.0100   DYNAMIC   Gi0/10"},{t:"head",s:"=== 🏆 DIAGNOSTIC TERMINÉ ==="},{t:"ok",s:"Problème identifié : STP bloquait VLAN 10 sur le trunk Gi0/10."},{t:"ok",s:"Solution : corriger le STP ou vérifier la topologie pour éliminer la boucle."}],
        explication:"La table MAC confirme que les trames VLAN 10 transitent maintenant. show arp (sur le routeur) confirmera la résolution IP↔MAC."
      }
    ]
  },
  {
    id:"ps-investigation",
    label:"🟦 Investigation Windows",
    shell:"powershell",
    desc:"Analyse un poste Windows potentiellement compromis avec PowerShell.",
    steps:[
      {
        titre:"Étape 1 — Processus anormaux",
        contexte:"L'antivirus a déclenché une alerte. Cherche les processus suspects.",
        hint:"Utilise 'Get-Process | Sort-Object WorkingSet -Desc | Select-Object -First 5'",
        expected:["Get-Process | Sort-Object","Get-Process"],
        output:[{t:"ok",s:"NPM(K)  PM(M)    WS(M)    CPU(s)   Id   ProcessName"},{t:"ok",s:"   45   65.12   180.23    12.45  9012  svchost"},{t:"warn",s:"   88  124.50   310.80   445.20  6666  svch0st"},{t:"warn",s:"   34   42.23   108.45     2.34  1234  chrome"},{t:"err",s:"⚠️  'svch0st' (avec un zéro) consomme 445s CPU — ce n'est PAS le vrai svchost Windows !"}],
        explication:"Les malwares imitent souvent les noms de processus Windows légitimes en changeant un caractère (svchost → svch0st, lsass → lsas, etc.)."
      },
      {
        titre:"Étape 2 — Connexions réseau actives",
        contexte:"svch0st a peut-être une connexion vers l'extérieur. Vérifie les connexions TCP.",
        hint:"Utilise 'Get-NetTCPConnection -State Listen | Sort-Object LocalPort'",
        expected:["Get-NetTCPConnection","Get-NetTCP"],
        output:[{t:"ok",s:"LocalAddress  LocalPort  RemoteAddress   RemotePort  State    OwningProcess"},{t:"ok",s:"0.0.0.0       80         0.0.0.0         0           Listen   4"},{t:"warn",s:"0.0.0.0       4444       0.0.0.0         0           Listen   6666"},{t:"warn",s:"192.168.1.50  49321      185.220.101.45  443         Established 6666"},{t:"err",s:"⚠️  svch0st (PID 6666) écoute sur 4444 (Metasploit !) et est connecté à 185.220.101.45 (Tor exit node)."}],
        explication:"Port 4444 = port par défaut de Metasploit meterpreter. Connexion établie vers un nœud Tor = C2 (Command & Control). Compromission confirmée."
      },
      {
        titre:"Étape 3 — Vérifier les clés de registre Run",
        contexte:"Le malware a peut-être ajouté une persistance dans le registre.",
        hint:"Utilise 'Get-ItemProperty HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'",
        expected:["Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'","Get-ItemProperty 'HKCU"],
        output:[{t:"ok",s:"OneDrive : C:\\Users\\Admin\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe"},{t:"warn",s:"WindowsHelper : C:\\Users\\Admin\\AppData\\Roaming\\svch0st.exe"},{t:"err",s:"⚠️  'WindowsHelper' pointe vers svch0st.exe dans AppData\\Roaming — persistance au démarrage !"}],
        explication:"HKCU\\Run = persistance par utilisateur. HKLM\\Run = persistance système (nécessite droits admin). AppData\\Roaming est souvent utilisé car accessible sans droits élevés."
      },
      {
        titre:"Étape 4 — Analyser les événements de sécurité",
        contexte:"Vérifie les événements 4688 (création de processus) pour tracer l'origine.",
        hint:"Utilise 'Get-WinEvent -FilterHashtable @{LogName=\"Security\";Id=4688} -MaxEvents 5'",
        expected:["Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688}","Get-WinEvent"],
        output:[{t:"ok",s:"TimeCreated           Id    Process          CommandLine"},{t:"ok",s:"2024-06-12 09:01:22  4688  cmd.exe          cmd /c whoami"},{t:"warn",s:"2024-06-12 09:00:55  4688  powershell.exe   -enc JABzAHYAYwBoADAAcwB0AA==  (base64!)"},{t:"warn",s:"2024-06-12 08:58:01  4688  svch0st.exe      C:\\Users\\Admin\\AppData\\Roaming\\svch0st.exe"},{t:"err",s:"⚠️  PowerShell encodé (base64) lancé 2min avant svch0st — c'est le dropper initial !"}],
        explication:"Event 4688 trace chaque création de processus. Le PowerShell encodé est le vecteur d'infection classique — phishing → macro Office → powershell -enc → malware."
      },
      {
        titre:"Étape 5 — Vérifier la politique d'exécution",
        contexte:"Comment le script PowerShell malveillant a-t-il pu s'exécuter ?",
        hint:"Utilise 'Get-ExecutionPolicy -List'",
        expected:["Get-ExecutionPolicy -List","Get-ExecutionPolicy"],
        output:[{t:"ok",s:"Scope          ExecutionPolicy"},{t:"warn",s:"MachinePolicy  Undefined"},{t:"warn",s:"LocalMachine   Unrestricted    ← ⚠️  Trop permissif !"},{t:"ok",s:"CurrentUser    RemoteSigned"},{t:"head",s:"=== 🏆 INVESTIGATION TERMINÉE ==="},{t:"err",s:"Vecteur : PowerShell Unrestricted + macro Office → dropper → svch0st.exe"},{t:"ok",s:"Actions : isoler le poste, supprimer la clé Run, tuer PID 6666, réimager si possible."},{t:"ok",s:"Prévention : ExecutionPolicy AllSigned + AppLocker + bloquer les macros Office."}],
        explication:"ExecutionPolicy Unrestricted = n'importe quel script s'exécute. Régler sur AllSigned (seulement scripts signés) ou RemoteSigned au minimum."
      }
    ]
  }
  ,
  {
    id:"docker-k8s",
    label:"🐳 Docker & Kubernetes",
    shell:"docker",
    desc:"Déploie une app conteneurisée, diagnostique un crash, scale en prod.",
    steps:[
      {
        titre:"Étape 1 — État des conteneurs",
        contexte:"L'équipe signale que l'application est partiellement hors ligne. Commence par lister tous les conteneurs, y compris les arrêtés.",
        hint:"Utilise 'docker ps -a' pour voir TOUS les conteneurs (actifs et stoppés).",
        expected:["docker ps -a","docker ps"],
        output:[
          {t:"ok",s:"CONTAINER ID   IMAGE        STATUS                    NAMES"},
          {t:"ok",s:"a1b2c3d4e5f6   nginx:1.25   Up 2 hours                web-prod"},
          {t:"ok",s:"b2c3d4e5f6a1   postgres:15  Up 2 hours                db-prod"},
          {t:"warn",s:"d4e5f6a1b2c3   myapp:1.0    Exited (1) 3 hours ago    app-crashed"},
          {t:"warn",s:"⚠️  myapp:1.0 a crashé (exit code 1). Le frontend tourne mais l'app backend est morte."}
        ],
        explication:"docker ps sans -a ne montre que les conteneurs actifs. Toujours utiliser -a pour le diagnostic. Exit code 1 = erreur applicative, 137 = OOM killer."
      },
      {
        titre:"Étape 2 — Lire les logs du crash",
        contexte:"Le conteneur app-crashed a un exit code 1. Consulte ses logs pour comprendre pourquoi.",
        hint:"Utilise 'docker logs app-crashed'",
        expected:["docker logs app-crashed","docker logs"],
        output:[
          {t:"ok",s:"Starting myapp v1.0..."},
          {t:"ok",s:"Connecting to database at db-prod:5432..."},
          {t:"err",s:"ConnectionRefusedError: [Errno 111] Connection refused"},
          {t:"err",s:"ERROR: Could not connect to PostgreSQL after 3 retries."},
          {t:"warn",s:"⚠️  L'app ne peut pas joindre db-prod:5432 — probablement un problème de réseau Docker ou de nom de service."}
        ],
        explication:"Les conteneurs sur des réseaux différents ne se voient pas. Il faut un réseau bridge commun et utiliser le nom du service (db-prod) comme hostname, pas une IP."
      },
      {
        titre:"Étape 3 — Vérifier le réseau Docker",
        contexte:"L'app et la DB ne se joignent pas. Vérifie les réseaux Docker configurés.",
        hint:"Utilise 'docker network ls'",
        expected:["docker network ls","docker network"],
        output:[
          {t:"ok",s:"NETWORK ID     NAME          DRIVER    SCOPE"},
          {t:"ok",s:"a1b2c3d4e5f6   bridge        bridge    local"},
          {t:"ok",s:"d4e5f6a1b2c3   app-network   bridge    local"},
          {t:"warn",s:"ℹ️  web-prod et db-prod sont sur app-network mais myapp était sur le réseau bridge par défaut."},
          {t:"info",s:"→ Solution: relancer myapp avec --network app-network (ou via docker-compose qui gère ça automatiquement)."}
        ],
        explication:"Le réseau bridge par défaut ne résout pas les noms de conteneurs en DNS. Un réseau bridge custom (créé par docker-compose ou manuellement) active la résolution DNS automatique."
      },
      {
        titre:"Étape 4 — Vérifier la conf nginx avec docker exec",
        contexte:"Tant qu'on est là, vérifie que la config nginx du conteneur web est valide.",
        hint:"Utilise 'docker exec web-prod nginx -t'",
        expected:["docker exec web-prod nginx -t","docker exec web-prod","docker exec"],
        output:[
          {t:"ok",s:"nginx: the configuration file /etc/nginx/nginx.conf syntax is ok"},
          {t:"ok",s:"nginx: configuration file /etc/nginx/nginx.conf test is successful"},
          {t:"info",s:"✅ Config nginx valide. docker exec permet de lancer n'importe quelle commande dans un conteneur actif."}
        ],
        explication:"docker exec est essentiel pour le debug : inspecter des fichiers, tester des connexions, vérifier des processus — sans redémarrer le conteneur."
      },
      {
        titre:"Étape 5 — Déployer avec docker-compose",
        contexte:"Pour éviter les problèmes de réseau manuels, relance tout via docker-compose qui gère le réseau automatiquement.",
        hint:"Utilise 'docker-compose up -d'",
        expected:["docker-compose up -d","docker-compose up"],
        output:[
          {t:"ok",s:"[+] Running 4/4"},
          {t:"ok",s:" ✔ Network app-network  Created"},
          {t:"ok",s:" ✔ Container db-prod    Started"},
          {t:"ok",s:" ✔ Container cache      Started"},
          {t:"ok",s:" ✔ Container web-prod   Started"},
          {t:"info",s:"✅ docker-compose crée automatiquement un réseau commun — tous les services se joignent par leur nom."}
        ],
        explication:"docker-compose est le standard pour orchestrer plusieurs conteneurs en local ou en staging. En production, Kubernetes prend le relais pour le scaling et la haute disponibilité."
      },
      {
        titre:"Étape 6 — Kubernetes : diagnostiquer un CrashLoopBackOff",
        contexte:"En prod sur Kubernetes, le pod db-deploy est en CrashLoopBackOff. Commence par lister les pods.",
        hint:"Utilise 'kubectl get pods' pour voir l'état de tous les pods.",
        expected:["kubectl get pods","kubectl get"],
        output:[
          {t:"ok",s:"NAME                          READY   STATUS             RESTARTS   AGE"},
          {t:"ok",s:"web-deploy-7d4b9f8c6-x2k9p    1/1     Running            0          2h"},
          {t:"warn",s:"db-deploy-5c8f7d9b4-p1r2s     0/1     CrashLoopBackOff   5          45m"},
          {t:"warn",s:"⚠️  db-deploy redémarre en boucle depuis 45min. 5 restarts = problème persistant."}
        ],
        explication:"CrashLoopBackOff = le conteneur crashe immédiatement au démarrage, Kubernetes attend de plus en plus longtemps avant de retenter (backoff exponentiel)."
      },
      {
        titre:"Étape 7 — Lire les logs Kubernetes",
        contexte:"Même réflexe qu'avec Docker : lire les logs du pod en échec.",
        hint:"Utilise 'kubectl logs db-deploy-5c8f7d9b4-p1r2s'",
        expected:["kubectl logs db-deploy-5c8f7d9b4-p1r2s","kubectl logs"],
        output:[
          {t:"err",s:"FATAL: data directory \"/var/lib/postgresql/data\" has wrong ownership"},
          {t:"err",s:"HINT: The server must be started by the user that owns the data directory."},
          {t:"warn",s:"⚠️  Problème de permissions sur le PVC (Persistent Volume Claim)."},
          {t:"info",s:"→ Solution: ajouter dans le manifest YAML:"},
          {t:"info",s:"  securityContext:"},
          {t:"info",s:"    fsGroup: 999   # UID postgres"},
          {t:"head",s:"=== 🏆 SCÉNARIO TERMINÉ ==="},
          {t:"ok",s:"Tu maîtrises : diagnostic Docker (ps -a, logs, exec, network), docker-compose, et le debug K8s (get pods, logs)."},
          {t:"ok",s:"Réflexe clé : crash → logs → réseau/permissions → corriger le manifest/compose → redéployer."}
        ],
        explication:"fsGroup dans securityContext force Kubernetes à changer le groupe propriétaire du volume monté. Indispensable pour les bases de données qui refusent de démarrer si elles ne possèdent pas leur répertoire de données."
      }
    ]
  }
  ,{
    id:"ad-investigation",
    label:"🔴 Investigation Active Directory",
    shell:"ad",
    desc:"Un compte de service suspect a été identifié dans Domain Admins. Mène l'investigation complète.",
    steps:[
      {
        titre:"Étape 1 — Lister les membres de Domain Admins",
        contexte:"Une alerte SIEM signale qu'un compte de service est potentiellement dans le groupe Domain Admins. Commence par vérifier les membres du groupe.",
        hint:"Utilise 'Get-ADGroupMember \"Domain Admins\"'",
        expected:["Get-ADGroupMember \"Domain Admins\"","Get-ADGroupMember 'Domain Admins'","net group \"Domain Admins\" /domain"],
        output:[
          {t:"ok",s:"distinguishedName : CN=Administrateur,CN=Users,DC=corp,DC=local"},
          {t:"ok",s:"name              : Administrateur  | objectClass : user"},
          {t:"ok",s:""},
          {t:"ok",s:"distinguishedName : CN=admin,OU=Admins,DC=corp,DC=local"},
          {t:"ok",s:"name              : admin           | objectClass : user"},
          {t:"ok",s:""},
          {t:"warn",s:"distinguishedName : CN=svc-backup,OU=ServiceAccounts,DC=corp,DC=local"},
          {t:"warn",s:"name              : svc-backup      | objectClass : user  ← ANORMAL"},
          {t:"warn",s:"⚠️  Compte de service svc-backup dans Domain Admins — violation du principe de moindre privilège !"}
        ],
        explication:"Get-ADGroupMember liste tous les membres d'un groupe AD. Un compte de service (svc-*) dans Domain Admins est une erreur critique : si ce compte est compromis, l'attaquant obtient les droits d'admin sur tout le domaine."
      },
      {
        titre:"Étape 2 — Analyser le compte suspect",
        contexte:"Le compte svc-backup est anormal dans Domain Admins. Récupère ses propriétés complètes pour comprendre son niveau d'exposition.",
        hint:"Utilise 'Get-ADUser -Identity svc-backup -Properties *'",
        expected:["Get-ADUser -Identity svc-backup -Properties *","Get-ADUser svc-backup -Properties *"],
        output:[
          {t:"ok",s:"CN                    : svc-backup"},
          {t:"ok",s:"Description           : Compte service sauvegarde Veeam"},
          {t:"ok",s:"Enabled               : True"},
          {t:"warn",s:"PasswordNeverExpires  : True"},
          {t:"warn",s:"PasswordLastSet       : 15/01/2021 10:00:00"},
          {t:"ok",s:"LastLogonDate         : 19/06/2025 02:15:43"},
          {t:"ok",s:"SID                   : S-1-5-21-3874928736-2546254271-2417930603-1150"},
          {t:"ok",s:"MemberOf              : Domain Admins, Backup Operators"},
          {t:"warn",s:"⚠️  Mot de passe vieux de +4 ans et configuré pour ne jamais expirer."},
          {t:"warn",s:"⚠️  Dernière connexion à 02h15 (heure inhabituelle) — possible compromission !"}
        ],
        explication:"PasswordNeverExpires=True + PasswordLastSet vieux de 4 ans = cible idéale pour le Kerberoasting. La connexion à 02h15 est suspecte pour un compte de service de sauvegarde qui tourne normalement la nuit mais dont les accès devraient être automatiques et connus."
      },
      {
        titre:"Étape 3 — Vérifier les SPNs (Kerberoasting)",
        contexte:"Un mot de passe vieux de 4 ans sur un compte DA est critique. Vérifie si ce compte est exposé au Kerberoasting via ses SPNs.",
        hint:"Utilise 'setspn -Q */corp.local' pour lister tous les SPNs",
        expected:["setspn -Q */corp.local","setspn -L svc-backup"],
        output:[
          {t:"ok",s:"Checking domain DC=corp,DC=local"},
          {t:"ok",s:"CN=DC01,OU=Domain Controllers,DC=corp,DC=local"},
          {t:"ok",s:"    HOST/DC01, HOST/DC01.corp.local, ldap/DC01.corp.local"},
          {t:"ok",s:"CN=svc-sql,OU=ServiceAccounts,DC=corp,DC=local"},
          {t:"warn",s:"    MSSQLSvc/SRV-SQL01.corp.local:1433  ← Kerberoastable"},
          {t:"ok",s:"CN=svc-web,OU=ServiceAccounts,DC=corp,DC=local"},
          {t:"ok",s:"    HTTP/intranet.corp.local"},
          {t:"info",s:"→ svc-backup n'a pas de SPN — mais il est DA, ce qui est bien pire."},
          {t:"warn",s:"⚠️  svc-sql est Kerberoastable (SPN enregistré + compte de service)."}
        ],
        explication:"Le Kerberoasting consiste à demander un TGS pour un service avec SPN, puis à casser hors-ligne le hash du mot de passe. svc-backup n'a pas de SPN mais sa présence dans Domain Admins est encore plus dangereuse. svc-sql avec son SPN SQL Server est vulnérable si son mot de passe est faible."
      },
      {
        titre:"Étape 4 — Vérifier la politique de mots de passe",
        contexte:"Avec des comptes de service à mots de passe non expirants, la politique de domaine est probablement défaillante. Vérifie-la.",
        hint:"Utilise 'Get-ADDefaultDomainPasswordPolicy'",
        expected:["Get-ADDefaultDomainPasswordPolicy","net accounts /domain"],
        output:[
          {t:"ok",s:"ComplexityEnabled           : True"},
          {t:"ok",s:"LockoutDuration             : 00:30:00"},
          {t:"ok",s:"LockoutThreshold            : 5"},
          {t:"warn",s:"MaxPasswordAge              : 00:00:00  (mots de passe n'expirent jamais)"},
          {t:"ok",s:"MinPasswordLength           : 8"},
          {t:"ok",s:"PasswordHistoryCount        : 10"},
          {t:"ok",s:"ReversibleEncryptionEnabled : False"},
          {t:"warn",s:"⚠️  MaxPasswordAge = 0 : politique non conforme. Recommandation ANSSI : 90 jours max."},
          {t:"warn",s:"⚠️  MinPasswordLength = 8 : trop court. Recommandation ANSSI : 12 caractères minimum."}
        ],
        explication:"La politique de domaine s'applique à tous les comptes. MaxPasswordAge=0 signifie que les mots de passe ne sont jamais forcés à changer. Pour les comptes de service, on utilise en pratique des Fine-Grained Password Policies (FGPP) avec des mots de passe très longs (25+ caractères) et des MSA/gMSA pour la rotation automatique."
      },
      {
        titre:"Étape 5 — Auditer les connexions suspectes",
        contexte:"La connexion à 02h15 est suspecte. Vérifie les événements de sécurité pour ce compte.",
        hint:"Utilise 'auditpol /get /category:*' pour vérifier si l'audit est bien activé",
        expected:["auditpol /get /category:*","Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625} -MaxEvents 10"],
        output:[
          {t:"ok",s:"Category/Subcategory                      Setting"},
          {t:"ok",s:"Logon/Logoff"},
          {t:"ok",s:"  Logon                                    Success and Failure"},
          {t:"ok",s:"  Account Lockout                          Success"},
          {t:"warn",s:"Object Access"},
          {t:"warn",s:"  File System                             No Auditing  ← non conforme ANSSI"},
          {t:"warn",s:"  Registry                                No Auditing  ← non conforme ANSSI"},
          {t:"ok",s:"Account Management"},
          {t:"ok",s:"  User Account Management                  Success and Failure"},
          {t:"warn",s:"  Computer Account Management             No Auditing  ← manquant"},
          {t:"warn",s:"⚠️  Audit incomplet : système de fichiers et registre non audités."},
          {t:"info",s:"→ EventID 4624 = connexion réussie | 4625 = échec | 4720 = création compte | 4728 = ajout groupe"}
        ],
        explication:"L'audit des connexions (Logon/Logoff) est activé, ce qui permet de retrouver la connexion à 02h15 via EventID 4624. Mais l'absence d'audit sur les fichiers/registre signifie qu'on ne peut pas savoir ce que l'attaquant a fait après s'être connecté. L'ANSSI recommande d'activer tous les audits critiques."
      },
      {
        titre:"Étape 6 — Vérifier la réplication AD (compromission DC ?)",
        contexte:"Si l'attaquant a des droits DA, il peut avoir effectué un DCSync pour extraire tous les hashes NTLM. Vérifie l'état de la réplication.",
        hint:"Utilise 'repadmin /replsummary'",
        expected:["repadmin /replsummary","repadmin /showrepl"],
        output:[
          {t:"ok",s:"Replication Summary Start Time: 2025-06-19 14:05:22"},
          {t:"ok",s:""},
          {t:"ok",s:"Source DSA          largest delta    fails/total    %%  error"},
          {t:"ok",s:" DC02                    00m:32s    0 /   5    0"},
          {t:"ok",s:""},
          {t:"ok",s:"Destination DSA     largest delta    fails/total    %%  error"},
          {t:"ok",s:" DC02                    00m:32s    0 /   5    0"},
          {t:"ok",s:""},
          {t:"warn",s:"⚠️  Réplication normale MAIS une attaque DCSync ne génère pas d'erreur de réplication."},
          {t:"warn",s:"→ Vérifier EventID 4662 (accès objet AD) et 4673 (opération privilège) dans les logs de sécurité."},
          {t:"info",s:"→ Un DCSync légitime est effectué par les DC — tout autre machine avec cet EventID est suspect."}
        ],
        explication:"Le DCSync est une technique d'attaque utilisant le protocole de réplication AD (DRSGetNCChanges) pour extraire les hashes NTLM de tous les comptes, y compris krbtgt. Avec ces hashes, un attaquant peut créer des Golden Tickets. La réplication normale ne montre pas d'anomalie — il faut surveiller l'EventID 4662 avec les droits 'Replicating Directory Changes'."
      },
      {
        titre:"Étape 7 — Plan de remédiation",
        contexte:"Tu as identifié toutes les failles. Applique les premières mesures d'urgence : retirer svc-backup de Domain Admins.",
        hint:"Utilise 'net group \"Domain Admins\" svc-backup /delete /domain'",
        expected:["net group \"Domain Admins\" svc-backup /delete /domain","Remove-ADGroupMember -Identity 'Domain Admins' -Members svc-backup"],
        output:[
          {t:"ok",s:"La commande s'est correctement terminée."},
          {t:"ok",s:""},
          {t:"ok",s:"✅ svc-backup retiré de Domain Admins."},
          {t:"ok",s:""},
          {t:"head",s:"=== ACTIONS DE REMÉDIATION COMPLÈTES ==="},
          {t:"ok",s:"✅ 1. Retirer svc-backup de Domain Admins (fait)"},
          {t:"ok",s:"   → Attribuer uniquement les droits nécessaires à la sauvegarde (Backup Operators)"},
          {t:"ok",s:"✅ 2. Forcer le changement de mot de passe de svc-backup et svc-sql"},
          {t:"ok",s:"   → Utiliser un gMSA (group Managed Service Account) pour rotation automatique"},
          {t:"ok",s:"✅ 3. Corriger la politique de mots de passe du domaine"},
          {t:"ok",s:"   → MaxPasswordAge : 90 jours | MinPasswordLength : 12 caractères"},
          {t:"ok",s:"✅ 4. Activer l'audit complet (fichiers, registre, objets AD)"},
          {t:"ok",s:"✅ 5. Réinitialiser le mot de passe krbtgt 2 fois (protection Golden Ticket)"},
          {t:"ok",s:"✅ 6. Déployer des Fine-Grained Password Policies pour les comptes de service"},
          {t:"head",s:"=== 🏆 SCÉNARIO TERMINÉ ==="},
          {t:"ok",s:"Tu maîtrises : audit AD, détection de comptes surprivilégiés, Kerberoasting, DCSync, remédiation."},
          {t:"ok",s:"Réflexe clé : Domain Admins doit contenir le minimum absolu — jamais de comptes de service."}
        ],
        explication:"La remédiation d'une compromission AD suit un ordre précis : 1) couper l'accès immédiat, 2) changer les credentials, 3) réinitialiser krbtgt (invalide tous les TGT existants y compris les Golden Tickets), 4) auditer ce qui a été fait avec ces droits, 5) corriger les politiques pour éviter la récidive. La double réinitialisation de krbtgt est essentielle car chaque DC garde en cache l'ancien mot de passe pendant la durée de vie du ticket."
      }
    ]
  }
];
