<script>
    import Header from './components/LoginView/header.svelte';
    import Servicetiles from './components/LoginView/servicetiles.svelte';
    import LoginBody from './components/LoginView/body.svelte'
    const cards = [
        {
            title: 'Github',
            subtitle: 'Github actions.. ',
            imageUrl: 'Assets/services/githubLogo.png',
        },
        {
            title: 'Spotify',
            subtitle: 'Spotify actions.. ',
            imageUrl: 'Assets/services/Spotify.png',
        },
        {
            title: 'Google Calendar',
            subtitle: 'Google Calendar actions.. ',
            imageUrl: 'Assets/services/googleCalendar.png',
        },
        {
            title: 'Trello',
            subtitle: 'Trello actions.. ',
            imageUrl: 'Assets/services/trelloLogo.jpeg',
        },
    ];
</script>

<body>
    <main>
        <div>
            <Header/>
            {#each cards as card}
                <Servicetiles {...card} />
            {/each}
            <LoginBody/>
        </div>
    </main>
</body>

<style>
    main {
        max-width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>