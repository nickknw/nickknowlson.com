    $(document).ready(function() {

        // github

        $.getJSON('https://api.github.com/users/nickknw/repos?sort=pushed&callback=?', function(repos) {

            var counter = 0, repo_name;
            do {
                repo_name = repos.data[counter].name;
                counter += 1;
            }
            while(repo_name === 'nickknowlson.com' || repo_name === 'nickknw.github.com');

            $.getJSON('https://api.github.com/repos/nickknw/'+repo_name+'/commits?callback=?', function(commits) {

                var commit_data = commits.data;

                var most_recent_commit = 0;
                $.each(commit_data, function(commit_counter) {
                    if(commit_data[most_recent_commit].commit.committer.date < commit_data[commit_counter].commit.committer.date) {
                        most_recent_commit = commit_counter;
                    }
                });

                var recentCommit = commit_data[most_recent_commit]

                $("#github_commit_message").replaceWith(
                '<div id="github_commit_message" style="display:none;">' +
                '<strong>nickknw/'+repo_name+': </strong>' + 
                recentCommit.commit.message + '<span class="indent faded">' +
                new Date(recentCommit.commit.committer.date).toDateString().slice(4) +
                '</span></div>');

                // this feels hacky but hey, it works
                $('#git_url').attr('href', "http://github.com/nickknw/" + repo_name + "/commit/" + recentCommit.sha);
                $('#github_commit_message').fadeIn();
            });
        });

        // stackoverflow

        $.getJSON('http://api.stackoverflow.com/1.0/users/224354/answers/?jsonp=?', function(so_answer_data) {

            $.getJSON('http://api.stackoverflow.com/1.0/users/224354/questions/?jsonp=?', function(so_question_data) {

                var text="";
                url="http://www.stackoverflow.com/questions/";

                if(so_answer_data.answers[0].creation_date < so_question_data.questions[0].creation_date) {
                    text = '<div id="stack_overflow_activity" style="display:none;">' +
                    '<strong>Question: </strong>' +
                    so_question_data.questions[0].title + '<span class="indent faded">' +
                    new Date(so_question_data.questions[0].creation_date * 1000).toDateString().slice(4) +
                    '</span></div>';

                    url += so_question_data.questions[0].question_id;
                }
                else {
                    text = '<div id="stack_overflow_activity" style="display:none;">' +
                    '<strong>Answer: </strong>' +
                    so_answer_data.answers[0].title + '<span class="indent faded">' +
                    new Date(so_answer_data.answers[0].creation_date * 1000).toDateString().slice(4) +
                    '</span></div>';

                    url += so_answer_data.answers[0].question_id + '/' + 
                    so_answer_data.answers[0].answer_id + '#' + so_answer_data.answers[0].answer_id;
                }

                $("#stack_overflow_activity").replaceWith(text);
                $("#so_url").attr('href', url);
                $('#stack_overflow_activity').fadeIn();
            });
        });

        // twitter

        $.getJSON('http://twitter.com/status/user_timeline/nickknw.json?count=6&callback=?', function(twitter_data) {
            if(twitter_data && twitter_data[0]) {
                $("#twitter_text").replaceWith(
                '<div id="twitter_text" style="display:none;">' +
                twitter_data[0].text + '<span class="indent faded">' +
                new Date(twitter_data[0].created_at).toDateString().slice(4) +
                '</span></div>');
                $('#twitter_text').fadeIn();
            }
        });
    });

