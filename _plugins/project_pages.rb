module Jekyll

    class ProjectPage < Page
        def initialize(site, base, dir, name)
            @site = site
            @base = base
            @dir = File.join(dir, name.sub(/\..*/, ''))
            @name = name

            self.ext = File.extname(name)
            self.basename = 'index' #want fancy clean urls
            self.read_yaml(File.join(base, '_projects'), @name)
            self.data['is_project'] = true
        end

        def url
            return @url if @url

            @url = if permalink 
                permalink
            else
                '/'
            end

            @url
        end
    end

    class ProjectsGenerator < Generator
        safe true

        def generate(site)
            if site.layouts.key?('project')
                project_page_list = []

                projects_dir = File.join(site.source, '_projects')
                Dir.foreach(projects_dir) do |file|
                    if File.file?(File.join(projects_dir, file))
                        write_project_page(site, 'projects', file, project_page_list)
                    end
                end

                project_page_list.sort { |p1, p2| 
                    if p1.data['date'] == nil && p2.data['date'] == nil 
                        0
                    elsif p1.data['date'] == nil
                        1
                    elsif p2.data['date'] == nil
                        -1
                    else
                        p2.data['date'] <=> p1.data['date'] 
                    end
                }.each { |page| 
                    site.pages << page 
                }
            end
        end

        def write_project_page(site, dir, name, project_page_list)
            project_page = ProjectPage.new(site, site.source, dir, name)
            project_page.render(site.layouts, site.site_payload)
            project_page.write(site.dest)
            project_page_list << project_page
        end
    end

end
